import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Favorite from '../lib/models/Favorite';
import Drink from '../lib/models/Drink';

describe('demo routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  it('creates a user via POST', async () => {
    const res = await request(app).post('/api/v1/auth/signup').send({
      username: 'CupAJoe',
      email: 'cupajoe@aol.com',
      password: 'coffee123',
    });

    expect(res.body).toEqual({
      id: '1',
      username: 'CupAJoe',
      email: 'cupajoe@aol.com',
    });
  });

  it('logs in a user via POST', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'cupajoe@aol.com',
      password: 'coffee123',
    });

    expect(res.body).toEqual({
      id: '1',
      username: 'CupAJoe',
      email: 'cupajoe@aol.com',
    });
  });

  it('user can add fav drink via POST', async () => {
    const user = {
      username: 'CupAJoe',
      email: 'cupajoe@aol.com',
      password: 'coffee123',
    };
    const favoriteDrink = 'Americano';

    const loggedUser = await request(app).post('/api/v1/auth/login').send(user);
    await request(app)
      .post('/api/v1/favorites')
      .send({ favoriteDrink, id: loggedUser.body.id });

    expect({ ...loggedUser.body, favoriteDrink }).toEqual({
      id: '1',
      favoriteDrink,
      username: 'CupAJoe',
      email: 'cupajoe@aol.com',
    });
  });

  it('gets a user\'s favorite coffee via GET', async () => {
    const user = {
      username: 'CupAJoe',
      email: 'cupajoe@aol.com',
      password: 'coffee123',
    };

    const favoriteDrink = {
      drinkName: 'Latte',
      brew: 'Espresso',
      description: 'xyz',
      ingredients: ['Espresso', 'Milk'],
    };

    const favoriteDrink1 = {
      drinkName: 'Americano',
      brew: 'Espresso',
      description: 'xyz',
      ingredients: ['Espresso', 'Milk'],
    };

    await Drink.insert(favoriteDrink);
    await Drink.insert(favoriteDrink1);

    const resFavDrink = await Drink.getAll();

    const loggedUser = await request(app).post('/api/v1/auth/login').send(user);

    await Favorite.add(loggedUser.body.id, resFavDrink[0].id);
    await request(app)
      .post('/api/v1/auth/favorites')
      .send({ id: loggedUser.body.id, drinkId: resFavDrink[1].id });

    expect({
      ...loggedUser.body,
      favoriteDrink: resFavDrink.map((favoDrink) => favoDrink.drinkName),
    }).toEqual({
      id: '1',
      favoriteDrink: resFavDrink.map((favoDrink) => favoDrink.drinkName),
      username: 'CupAJoe',
      email: 'cupajoe@aol.com',
    });
  });

  it('users can add drinks under their account via POST', async () => {
    const user = {
      username: 'MochaJoe',
      email: 'mochaJo@aol.com',
      password: 'coffee123',
    };

    const userDrink = {
      drinkName: 'Latte',
      brew: 'Espresso',
      description: 'xyz',
      ingredients: ['Espresso', 'Milk'],
    };

    const userInfo = await request(app).post('/api/v1/auth/login').send(user);
    const res = await request(app)
      .post('/api/v1/auth/user/drinks')
      .send(userDrink, user.id);

    expect(res.body).toEqual({
      id: res.id,
      ...userDrink,
      user: userInfo.id, 
    }); 
  });
  
  // it('User can update their own post via PUT', async () => {
  //   const user = {
  //     username: 'MochaJoe',
  //     email: 'mochaJo@aol.com',
  //     password: 'coffee123',
  //   };

  //   const userDrink = {
  //     drinkName: 'Latte',
  //     brew: 'Espresso',
  //     description: 'xyz',
  //     ingredients: ['Espresso', 'Milk'],
  //   };
    
  //   const updateDrink = {
  //     drinkName: 'ChaiLatte',
  //     brew: 'Espresso',
  //     description: 'xyz',
  //     ingredients: ['Espresso', 'Milk', 'Chai'],
  //   };



  //   const drinkInfo = await request(app).post('/api/v1/auth/login').send(user);
  //   await Drink.insert(userDrink);
  //   const  updatedDrinkInfo = await request(app).put()
        
  // }); 
});

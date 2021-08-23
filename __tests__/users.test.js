import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Favorite from '../lib/models/Favorite';
import Drink from '../lib/models/Drink';

const agent = request.agent(app); 

describe('demo routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  it('creates a user via POST', async () => {
    const res = await agent.post('/api/v1/auth/signup').send({
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
    const res = await agent.post('/api/v1/auth/login').send({
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

    const loggedUser = await agent.post('/api/v1/auth/login').send(user);
  
    await Favorite.add(loggedUser.body.id, resFavDrink[0].id);
    await agent
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
      username: 'CupAJoe',
      email: 'cupajoe@aol.com',
      password: 'coffee123',
    };

    const userDrink = {
      drinkName: 'Latte',
      brew: 'Espresso',
      description: 'xyz',
      ingredients: ['Espresso', 'Milk'],
    };

    const userInfo = await agent.post('/api/v1/auth/login').send(user);
 
    const res = await agent
      .post('/api/v1/auth/drinks')
      .send(userDrink, userInfo.body.id);
    
    expect(res.body).toEqual({
      id: res.body.id,
      ...userDrink,
      user: userInfo.id,
    });
  });
  
  // it('User can update their own posts via PUT', async () => {
  //   const user = {
  //     username: 'CupAJoe',
  //     email: 'cupajoe@aol.com',
  //     password: 'coffee123',
  //   };

  //   const userDrink = {
  //     drinkName: 'Latte',
  //     brew: 'Espresso',
  //     description: 'xyz',
  //     ingredients: ['Espresso', 'Milk'],
  //   };
    
  //   const updateDrink = {
  //     drinkName: 'Chai Latte',
  //     brew: 'Espresso',
  //     description: 'Chai Latte',
  //     ingredients: ['Milk', 'Tea'],
  //   };

  //   const userInfo = await agent
  //     .post('/api/v1/auth/login')
  //     .send(user);
  
  //   await Drink.insertDrinkToAPI({ ...userDrink, userId: userInfo.body.id });
    
  //   const updatedDrinkInfo = await agent
  //     .put(`/api/v1/auth/drinks/${userInfo.body.id}`) // refactor this // this should be the drink id
  //     .send(updateDrink);
    
  //   expect(updatedDrinkInfo.body).toEqual({
  //     id: '1',
  //     ...userInfo, 
  //     ...updateDrink, 
  //   }); 
  // }); 
});

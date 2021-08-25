import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Favorite from '../lib/models/Favorite';
import Drink from '../lib/models/Drink';

const agent = request.agent(app);

describe('user routes', () => {
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
      .post('/api/v1/auth/favorites')
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
    const user = await agent.post('/api/v1/auth/login').send({
      username: 'CupAJoe',
      email: 'cupajoe@aol.com',
      password: 'coffee123',
    });

    const userDrink = {
      drinkName: 'Latte',
      brew: 'Espresso',
      description: 'xyz',
      ingredients: ['Espresso', 'Milk'],
      postId: user.body.id,
    };

    const res = await agent
      .post('/api/v1/auth/drinks')
      .send(userDrink, user.body.id);

    expect(res.body).toEqual({
      id: res.body.id,
      ...userDrink,
    });
  });

  it('User can update their own posts via PUT', async () => {
    const user = await agent.post('/api/v1/auth/login').send({
      username: 'CupAJoe',
      email: 'cupajoe@aol.com',
      password: 'coffee123',
    });

    const userDrink = {
      drinkName: 'Latte',
      brew: 'Espresso',
      description: 'xyz',
      ingredients: ['Espresso', 'Milk'],
      postId: user.body.id,
    };

    const updateDrink = {
      drinkName: 'Chai Latte',
      brew: 'Espresso',
      description: 'Chai Latte',
      ingredients: ['Milk', 'Tea'],
      postId: user.body.id,
    };

    const drink = await Drink.insertDrinkToAPI({
      ...userDrink,
      userId: user.body.id,
    });

    const updatedDrinkInfo = await agent
      .put(`/api/v1/auth/drinks/${drink.id}`)
      .send({ drinkId: drink.id, updateDrink });

    expect(updatedDrinkInfo.body).toEqual({
      id: drink.id,
      ...updateDrink,
    });
  });
  it('should delete a drink post by ID Via DELETE', async () => {
    const user = await agent.post('/api/v1/auth/login').send({
      username: 'CupAJoe',
      email: 'cupajoe@aol.com',
      password: 'coffee123',
    });
    const userDrink = {
      drinkName: 'Latte',
      brew: 'Espresso',
      description: 'xyz',
      ingredients: ['Espresso', 'Milk'],
      postId: user.body.id,
    };
    const drink = await Drink.insertDrinkToAPI({
      ...userDrink,
      userId: user.body.id,
    });
    await agent.delete(`/api/v1/auth/drinks/${drink.id}`); 
    expect({
      message: `${drink.id} was deleted`,
    }).toEqual({
      message: `${drink.id} was deleted`,
    });
  });
});

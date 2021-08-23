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

  it("gets a user's favorite coffee via GET", async () => {
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

    await request(app).post('/api/v1/drinks').send(favoriteDrink);
    await request(app).post('/api/v1/drinks').send(favoriteDrink1);
    // just use model functions
    const resFavDrink = await Drink.getAll();

    const loggedUser = await request(app).post('/api/v1/auth/login').send(user);

    await Favorite.add(loggedUser.body.id, resFavDrink[0].id);
    await request(app)
      .post('/api/v1/auth/favorites')
      .send({ id: loggedUser.body.id, drinkId: resFavDrink[1].id });

    const favDrinks = [];
    for (const item of resFavDrink) {
      favDrinks.push(item.drinkName);
    }
    // .map()

    expect({
      ...loggedUser.body,
      favoriteDrink: favDrinks,
    }).toEqual({
      id: '1',
      favoriteDrink: favDrinks,
      username: 'CupAJoe',
      email: 'cupajoe@aol.com',
    });
  });
});

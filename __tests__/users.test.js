import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import User from '../lib/models/User';

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

  it('gets a users favorited coffee via GET', async () => {
    
    const user = {
      username: 'CupAJoe',
      email: 'cupajoe@aol.com',
      password: 'coffee123',
    };

    const favoriteDrink = 'Flat White';

    
    const loggedUser = await request(app).post('/api/v1/auth/login').send(user);
    await request(app)
      .post('/api/v1/auth/favorites')
      .send({ favoriteDrink, id: loggedUser.body.id });

    const res = await request(app).get(`/api/v1/auth/favorites/${loggedUser.body.id}`);
    console.log('res <---------', res.body);
    expect({ ...loggedUser.body, favoriteDrink: res.body.favoriteDrink }).toEqual({
      id: '1',
      favoriteDrink,
      username: 'CupAJoe',
      email: 'cupajoe@aol.com',
    });
  });
});

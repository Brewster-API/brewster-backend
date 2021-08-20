import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  it('creates a user via POST', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
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
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
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
    const userFavDrink = await request(app)
      .post('/api/v1/favorites')
      .send({ favoriteDrink, id: loggedUser.body.id });
    const { favDrink } = userFavDrink;

    expect({ ...loggedUser.body, favoriteDrink }).toEqual({
      id: '1',
      favoriteDrink,
      username: 'CupAJoe',
      email: 'cupajoe@aol.com',
    });
  });
});

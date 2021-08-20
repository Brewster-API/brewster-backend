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
});

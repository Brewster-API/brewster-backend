import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import User from '../lib/models/User.js';

describe('github routes', () => {
  beforeEach(() => {
    return setup(pool).then(() => {
      User.gitInsert({ username: 'cupajoe' });
    });
  });
  it('display current loged in user', async () => {
    const res = await request(app).get('/api/v1/githubauth/verify');
    expect(res.body).toEqual({ message: 'please login',
      status: 401 });
  });
});




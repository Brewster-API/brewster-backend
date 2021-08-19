import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('returns all drinks Via GET', async () => {
    const drink1 = {
      drinkName: 'Latte',
      brew: 'Espresso',
      description:
        'As the most popular coffee drink out there, the latte is comprised of a shot of espresso and steamed milk with just a touch of foam. It can be ordered plain or with a flavor shot of anything from vanilla to pumpkin spice.',
      ingredients: ['Espresso', 'Steamed Milk'],
    };
    const drink2 = {
      drinkName: 'Americano',
      brew: 'Espresso',
      description:
        'With a similar flavor to black coffee, the americano consists of an espresso shot diluted in hot water.',
      ingredients: ['Espresso', 'Hot Water'],
    };
    const drink3 = {
      drinkName: 'Black',
      brew: 'Drip',
      description:
        'Black coffee is as simple as it gets with ground coffee beans steeped in hot water, served warm. And if you want to sound fancy, you can call black coffee by its proper name: cafe noir',
      ingredients: ['Coffee'],
    };
    const response1 = await request(app).post('/api/v1/drinks').send(drink1);
    const response2 = await request(app).post('/api/v1/drinks').send(drink2);
    const response3 = await request(app).post('/api/v1/drinks').send(drink3);

    expect([response1.body, response2.body, response3.body]).toEqual([{
      id: '1',
      ...drink1,
    },
    {
      id: '2',
      ...drink2,
    },
    {
      id: '3',
      ...drink3,
    }]);

  });
});

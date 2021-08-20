import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Drink from '../lib/models/Drink.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('creates a new drink via POST', async () => {
    const drink = {
      drinkName: 'Latte',
      brew: 'Espresso',
      description:
        'As the most popular coffee drink out there, the latte is comprised of a shot of espresso and steamed milk with just a touch of foam. It can be ordered plain or with a flavor shot of anything from vanilla to pumpkin spice.',
      ingredients: ['Espresso', 'Steamed Milk'],
    };

    const res = await request(app).post('/api/v1/drinks').send(drink);

    expect(res.body).toEqual({
      id: '1',
      ...drink,
    });
  });

  it('returns all drinks Via GET', async () => {
    const drink1 = await Drink.insert({
      drinkName: 'Latte',
      brew: 'Espresso',
      description:
        'As the most popular coffee drink out there, the latte is comprised of a shot of espresso and steamed milk with just a touch of foam. It can be ordered plain or with a flavor shot of anything from vanilla to pumpkin spice.',
      ingredients: ['Espresso', 'Steamed Milk'],
    });
    const drink2 = await Drink.insert({
      drinkName: 'Americano',
      brew: 'Espresso',
      description:
        'With a similar flavor to black coffee, the americano consists of an espresso shot diluted in hot water.',
      ingredients: ['Espresso', 'Hot Water'],
    });
    const drink3 = await Drink.insert({
      drinkName: 'Black',
      brew: 'Drip',
      description:
        'Black coffee is as simple as it gets with ground coffee beans steeped in hot water, served warm. And if you want to sound fancy, you can call black coffee by its proper name: cafe noir',
      ingredients: ['Coffee'],
    });
    const res = await request(app).get('/api/v1/drinks');

    expect(res.body).toEqual([drink1, drink2, drink3]);
  });
  it('get a drink byId', async () => {
    const drink = await Drink.insert({
      drinkName: 'Latte',
      brew: 'Espresso',
      description:
        'As the most popular coffee drink out there, the latte is comprised of a shot of espresso and steamed milk with just a touch of foam. It can be ordered plain or with a flavor shot of anything from vanilla to pumpkin spice.',
      ingredients: ['Espresso', 'Steamed Milk'],
    });
    const res = await request(app).get(`/api/v1/drinks/${drink.id}`);
    expect(res.body).toEqual({
      id: '1',
      ...drink,
    });
  });
});

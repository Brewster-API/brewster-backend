/* eslint-disable no-console */
import client from '../lib/client.js';
import drinks from './drinks.js';

run();

async function run() {

  try {

    await Promise.all(
      drinks.map(drink => {
        return client.query(
          `INSERT INTO drinks (drink_name, brew, drink_description, ingredients, post_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
          [drink.drinkName, drink.brew, drink.description, drink.ingredients, drink.postId]);
      })
    );

    console.log('seed data load complete');

  } catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }

}

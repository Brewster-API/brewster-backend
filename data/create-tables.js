import client from '../lib/client.js';
import drinks from './drinks.js';
run();

async function run() {
  try {
    await client.query(`
    CREATE TABLE users (
        id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        username TEXT,
        email TEXT UNIQUE,
        password_hash TEXT
    );
    CREATE TABLE drinks (
        id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        drink_name TEXT  NOT NULL,
        brew TEXT NOT NULL,
        drink_description TEXT NOT NULL,
        ingredients TEXT [] NOT NULL,
        post_id BIGINT REFERENCES users(id)
      );
    CREATE TABLE favorites (
    user_id BIGINT NOT NULL,
    drink_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (drink_id) REFERENCES drinks(id) ON DELETE CASCADE
      )
    `);
    await Promise.all(
      drinks.map((drink) => {
        return client.query(
          `INSERT INTO drinks (drink_name, brew, drink_description, ingredients, post_id)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *`,
          [
            drink.drinkName,
            drink.brew,
            drink.description,
            drink.ingredients,
            drink.postId,
          ]
        );
      })
    );
    console.log('create tables complete');
  } catch (err) {
    console.log(err);
  } finally {
    client.end();
  }
}
export default run;

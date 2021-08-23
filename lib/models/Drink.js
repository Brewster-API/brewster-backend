import pool from '../utils/pool.js';

export default class Drink {
  id;
  drinkName;
  brew;
  description;
  ingredients;

  constructor(row) {
    this.id = row.id;
    this.drinkName = row.drink_name;
    this.brew = row.brew;
    this.description = row.drink_description;
    this.ingredients = row.ingredients;
  }
  static async getAll() {
    const { rows } = await pool.query(`SELECT * FROM drinks`);
    return rows.map((row) => new Drink(row));
  }
  static async insert({ drinkName, brew, description, ingredients }) {
    const { rows } = await pool.query(
      `INSERT INTO drinks (drink_name, brew, drink_description, ingredients)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [drinkName, brew, description, ingredients]
    );
    return new Drink(rows[0]);
  }
  static async getById(id) {
    const { rows } = await pool.query(`SELECT * FROM drinks WHERE id=$1`, [id]);
    return new Drink(rows[0]);
  }
  static async insertDrinkToAPI({
    drinkName,
    brew,
    description,
    ingredients,
    userId
  }) {
    const { rows } = await pool.query(
     
      `
      INSERT INTO drinks (drink_name, brew, drink_description, ingredients)
      VALUES ($1, $2, $3, $4)
      SELECT * FROM drinks
      JOIN favorites
      ON drinks.id = favorites.drink_id
      JOIN users
      ON favorites.user_id=users.id
      WHERE users.id=userId
      `[drinkName, brew, description, ingredients, userId]
    );

    console.log(rows[0])
     return new Drink(rows[0]);
  }
}

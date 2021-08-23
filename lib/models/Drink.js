import pool from '../utils/pool.js';

export default class Drink {
  id;
  drinkName;
  brew;
  description;
  ingredients;
  postId; 

  constructor(row) {
    this.id = row.id;
    this.drinkName = row.drink_name;
    this.brew = row.brew;
    this.description = row.drink_description;
    this.ingredients = row.ingredients;
    this.postId = row.post_id; 
  }
  static async getAll() {
    const { rows } = await pool.query(`SELECT * FROM drinks`);
    return rows.map((row) => new Drink(row));
  }
  static async insert({ drinkName, brew, description, ingredients, postId }) {
    const { rows } = await pool.query(
     `INSERT INTO drinks (drink_name, brew, drink_description, ingredients, post_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [drinkName, brew, description, ingredients, postId]
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
      INSERT INTO drinks (drink_name, brew, drink_description, ingredients, post_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [drinkName, brew, description, ingredients, userId]
    );
    console.log(rows[0])
    return new Drink(rows[0]);
  }
}

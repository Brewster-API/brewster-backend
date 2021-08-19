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
}

import pool from '../utils/pool.js';

export default class Favorite {
  id;
  userId;
  favDrink;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.favDrink = row.fav_drink;
  }

  static async add(favDrink, userId) {
    const { rows } = await pool.query(`
        INSERT INTO favorites (fav_drink, user_id)
        VALUES ($1, $2)
        RETURNING *`,
      [favDrink, userId]
    );
    return new Favorite(rows[0]);
  }
}

import pool from '../utils/pool.js';

export default class Favorite {
  id;
  userId;
  drinkId;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.drinkId = row.drink_id;
  }

  static async add(userId, drinkId) {
    const { rows } = await pool.query(
      `
        INSERT INTO favorites (user_id, drink_id)
        VALUES ($1, $2)
        RETURNING *`,
      [userId, drinkId]
    );
    return new Favorite(rows[0]);
  }

  static async getFavoritesById(id) {
    const { rows } = await pool.query(
      `
    SELECT drink_name FROM drinks
    LEFT JOIN favorites
    ON drinks.id = favorites.drink_id
    LEFT JOIN users
    ON users.id = favorites.user_id
    WHERE users.id=$1
    `,
      [id]
    );
    return new Favorite(rows[0]);
  }
}

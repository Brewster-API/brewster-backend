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

  static async getFavoritesById(id) {
    const { rows } = await pool.query(
    `
    SELECT fav_drink FROM favorites
    RIGHT JOIN users
    ON
    favorites.user_id = users.id
    WHERE users.id=$1
    `,
    [id]
    );
    console.log('HERE_____', rows[0]);
    return new Favorite(rows[0]);
  }
}

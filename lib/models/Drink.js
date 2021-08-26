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
    userId,
  }) {
    const { rows } = await pool.query(
      `INSERT INTO drinks (drink_name, brew, drink_description, ingredients, post_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [drinkName, brew, description, ingredients, userId]
    );
    return new Drink(rows[0]);
  }

  static async update(
    id,
    userId,
    { drinkName, brew, description, ingredients, postId}
  ) {
    const existingDrink = await Drink.getById(id);
    const newDrinkName = drinkName ?? existingDrink.drinkName;
    const newBrew = brew ?? existingDrink.brew;
    const newDescription = description ?? existingDrink.description;
    const newIngredients = ingredients ?? existingDrink.ingredients;
    console.log(
      existingDrink,
      newDrinkName,
      newBrew,
      newDescription,
      newIngredients
    );
    console.log(id, userId, { drinkName, brew, description, ingredients });
    const { rows } = await pool.query(
      'UPDATE drinks SET drink_name=$1, brew=$2, drink_description=$3, ingredients=$4 WHERE id=$5 AND post_id=$6 RETURNING *',
      [newDrinkName, newBrew, newDescription, newIngredients, id, userId]
    );
    if (!rows[0]) return null; 
    return new Drink(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM drinks WHERE id=$1 RETURNING *',
      [id]
    );
    if (!rows[0]) return null; 
    return new Drink(rows[0]);
  }
}

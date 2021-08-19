import pool from '../utils/pool.js';

export default class User {
    id;
    username;
    email;
    passwordHash;

    constructor(row) {
        this.id = row.id;
        this.username = row.username;
        this.email = row.email;
        this.passwordHash = row.password_hash;
    }

    static async insert({username, email, passwordHash}) {
        const { rows } = await pool.query(`
        INSERT INTO users (username, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [username, email, passwordHash]);

        return new User(rows[0]);
    }



}

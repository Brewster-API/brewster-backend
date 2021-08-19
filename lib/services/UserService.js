import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export default class UserService {
  static async create({ username, email, password }) {
    const passwordHash = await bcrypt.hashSync(password, Number(10));
    return User.insert(username, email, passwordHash);
  }
}


import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export default class UserService {
  static async create({ username, email, password }) {
    const passwordHash = await bcrypt.hashSync(password, Number(10));
    return User.insert(username, email, passwordHash);
  }

  static async authorize(email, password) {
    const user = await User.findUser(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const matchingPassword = await bcrypt.compare(password, user.passwordHash);
    if (!matchingPassword) {
      throw new Error('Invalid email or password');
    }
    return user;
  }
}

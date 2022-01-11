import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export default class UserService {
  static async create({ email, password }) {
    const passwordHash = await bcrypt.hashSync(
      password,
      Number(process.env.SALT_ROUNDS) // Keeping this number in .env is a security measure
    );
    return User.insert(email, passwordHash);
  }

  static async authorize(email, password) {
    const user = await User.findByEmail(email);
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

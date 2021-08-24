import { exchangeCodeForToken, getUserProfile } from '../utils/githubOath.js';
import User from '../models/User.js';

export default class GitHubService {
  static async create(code) {
    const TOKEN = await exchangeCodeForToken(code);
    const userProfile = await getUserProfile(TOKEN);
    const user = await User.findByName(userProfile.login);
    if (!user) {
      return User.gitInsert({ username: userProfile.login });
    } else {
      return user;
    }
  }
}

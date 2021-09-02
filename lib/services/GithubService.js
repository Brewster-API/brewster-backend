import { exchangeCodeForToken, getUserProfile } from '../utils/githubApi.js';
import User from '../models/User.js';
export default class GitHubService {
  static async create(code) {
    try {
      const token = await exchangeCodeForToken(code);
      // Make sure to give an error if the token can't be retrieved
      if (!token) throw new Error('Login with Github failed');

      const userProfile = await getUserProfile(token);
      // Provide an error if the profile couldn't be retrieved
      if (!userProfile.login) throw new Error('Login with Github failed');

      const user = await User.findByUsername(userProfile.login);

      if (!user) {
        return User.insertByUsername(userProfile.login);
      } else {
        return user;
      }
    } catch (error) {
      // By throwing an error in our `catch` statement,
      // it gets bubbled up to the caller of this function (which is
      // the githubAuth controller's /githublogin/callback route).
      // The controller will catch the error and forward it on to `next()`
      throw new Error(error);
    }
  }
}

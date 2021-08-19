import { Router } from 'express';
// import User from '../models/User.js';
import UserService from '../services/UserService.js';

export default Router()
  .post('/signup', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);

      res.cookie('session', user.authToken(), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 10
      });
      res.send(user);

    } catch (error) {
      next(error);
    }
  });


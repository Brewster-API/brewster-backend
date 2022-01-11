import { Router } from 'express';
import UserService from '../services/UserService.js';

export default Router()
  .post('/signup', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.cookie('session', user.authToken(), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 10,
      });
      res.send(user);
    } catch (error) {
      next(error);
    }
  })
  .post('/login', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await UserService.authorize(email, password);
      res.cookie('session', user.authToken(), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 10,
      });
      res.send(user);
    } catch (error) {
      next(error);
    }
  })
  .get('/logout', (req, res, next) => {
    try {
      res.clearCookie('session');
      res.send({
        message: 'You have successfully logged out!',
      });
    } catch (error) {
      next(error);
    }
  });

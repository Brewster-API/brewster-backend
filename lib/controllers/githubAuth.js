import { Router } from 'express';
import jwt from 'jsonwebtoken';
import ensureAuth from '../middleware/auth-jwt.js';
import GitHubService from '../services/GithubService.js';

export default Router()
  .get('/githublogin', (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.Client_ID}&redirect_uri=${process.env.REDIRECT_URL}&scope=read:user`
    );
  })

  .get('/githublogin/callback', async (req, res, next) => {
    try {
      const user = await GitHubService.create(req.query.code);
      const userJWT = jwt.sign(user.toJSON, process.env.API_SECRET, {
        expiresIn: '24h',
      });
      res.cookie('session', userJWT, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  })
  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  });

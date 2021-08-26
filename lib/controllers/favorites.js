import { Router } from 'express';
import Favorite from '../models/Favorite.js';
import authJwt from '../middleware/auth-jwt.js';


export default Router()
  .post('/', authJwt, async (req, res, next) => {
    try {
      const id = req.body.id;
      const favDrinkId = req.body.drinkId;
      const favorite = await Favorite.add(id, favDrinkId);
      res.send(favorite);
    } catch (error) {
      next(error);
    }
  })
  .get('/', authJwt, async (req, res, next) => {
    try {
      const { id } = req.user;
      const response = await Favorite.getFavoritesById(id);
      res.send(response);
    } catch (error) {
      next(error);
    }
  }); 

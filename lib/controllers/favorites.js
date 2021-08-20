import { Router } from 'express';
import Favorite from '../models/Favorite.js';

export default Router()
.post('/', async (req, res, next) => {
    try {

      const id = req.body.id;
      const favDrink = req.body.favoriteDrink
      const favorite = await Favorite.add(favDrink, id);
      res.send(favorite);
    } catch (error) {
      next(error);
    }
  })
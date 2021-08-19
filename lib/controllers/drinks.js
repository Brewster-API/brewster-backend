import { Router } from 'express';
import Drink from '../models/Drink.js';

export default Router()
  .get('/', async (req, res, next) => {
    try {
      const drinks = await Drink.getAll();
      res.send(drinks);
    } catch (error) {
      next(error);
    }
  });

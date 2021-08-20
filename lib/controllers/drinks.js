import { Router } from 'express';
import Drink from '../models/Drink.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const drink = await Drink.insert(req.body);
      res.send(drink);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const drinks = await Drink.getAll();
      res.send(drinks);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const drink = await Drink.getById(req.params.id);
      res.send(drink);
    } catch (error) {
      next(error);
    }
  });


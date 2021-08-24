import { Router } from 'express';
import Drink from '../models/Drink.js';
import authJwt from '../middleware/auth-jwt.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const { drinkName, brew, description, ingredients, postId } = req.body;
      const drink = await Drink.insert({
        drinkName,
        brew,
        description,
        ingredients,
        postId,
      });
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
  })
  .post('/', authJwt, async (req, res, next) => {
    try {
      const response = await Drink.insertDrinkToAPI({
        ...req.body,
        userId: req.user.id,
      });
      res.send(response);
    } catch (error) {
      next(error);
    }
  })
  .put('/:id', authJwt, async (req, res, next) => {
    try {
      const response = await Drink.update(req.body.drinkId, req.user.id, {
        ...req.body.updateDrink,
      });
      res.send(response);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', authJwt, async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await Drink.delete(id);
      res.send(response);
    } catch (error) {
      next(error);
    }
  });

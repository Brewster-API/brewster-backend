import { Router } from 'express';
import Drink from '../models/Drink.js';
import authJwt from '../middleware/auth-jwt.js';

export default Router()
  .post('/', authJwt, async (req, res, next) => {
    // This route is doing identical behavior as the /favorites route here,
    // so the /favorites route can be removed (since it should be in the
    // favorites controller anyways)
    try {
      const drink = await Drink.insert({
        ...req.body,
        postId: req.user.id,
      });
      res.send(drink);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      // Make sure to use expressive variable names
      const type = req.query.type;
      const drinks = await Drink.getAll();

      if (!type) {
        res.send(drinks);
      } else {
        const filteredDrinks = drinks.filter((drink) => drink.brew === type);
        res.send(filteredDrinks);
      }
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
  .put('/:id', authJwt, async (req, res, next) => {
    try {
      const response = await Drink.update(req.params.id, req.user.id, {
        ...req.body,
      });
      if (!response) {
        res.send({ message: 'Cannot edit...' });
      } else {
        res.send(response);
      }
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', authJwt, async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const response = await Drink.delete(id, userId);
      if (!response) {
        res.send({ message: 'Cannot delete...' });
      } else {
        res.send(response);
      }
    } catch (error) {
      next(error);
    }
  });

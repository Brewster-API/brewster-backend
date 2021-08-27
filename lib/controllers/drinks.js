import { Router } from 'express';
import Drink from '../models/Drink.js';
import authJwt from '../middleware/auth-jwt.js';

export default Router()
  .post('/', authJwt, async (req, res, next) => {
    try {


      const { drinkName, brew, description, ingredients } = req.body;
      const drink = await Drink.insert({
        drinkName,
        brew,
        description,
        ingredients,
        postId: req.user.id,
      });
      res.send(drink);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const f = req.query.type;
      if (!f) {
        const drinks = await Drink.getAll();
        res.send(drinks);
      } else {
        const drinks = await Drink.getAll();
        const filteredDrink = drinks.filter((drink) => drink.brew === f);
        res.send(filteredDrink);
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
  .post('/favorites', authJwt, async (req, res, next) => {
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

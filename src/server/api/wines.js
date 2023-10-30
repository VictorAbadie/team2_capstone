const express = require('express');
const winesRouter = express.Router();

const { createWine,
        getAllWines,
    } = require('../db');

const jwt = require('jsonwebtoken')

winesRouter.get('/', async( req, res, next) => {
try {
const wines = await getAllWines();
console.log(wines)
res.send(wines);
} catch (error) {
    throw error
}
});

winesRouter.post('/', async (req, res, next) => {
  const { type, varietal, price = "" } = req.body;

  const postWine = {};

  try {
    postWine.type = type;
    postWine.varietal = varietal;
    postWine.price = price;

    const wine = await createWine(postWine);

    if (wine) {
      res.send(wine);
    } else {
      next({
        name: 'WineCreationError',
        message: 'There was an error creating your wine post. Please try again.'
      })
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});



module.exports = winesRouter;
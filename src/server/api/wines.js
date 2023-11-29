const express = require('express');
const winesRouter = express.Router();
const { requireUser } = require('./util');



const { createWine,
        getAllWines,
        getWineById,
        updateWine,
        deleteWine
    } = require('../db');

const jwt = require('jsonwebtoken')


// GET route for wines DB
winesRouter.get('/', async( req, res, next) => {
try {
const wines = await getAllWines();
console.log(wines)
res.send(wines);
} catch (error) {
    throw error
}
});

// GET route for single wine in DB by ID
winesRouter.get('/:id', async (req, res, next) => {
  try {
      const wine = await getWineById(req.params.id);
      res.send(wine);
  } catch (error) {
      next(error);
  }
});



// POST route for new wine in DB
winesRouter.post('/', requireUser, async (req, res, next) => {
  const { type, varietal, price, description, img = "" } = req.body;

  const postWine = {};

  try {
    postWine.type = type;
    postWine.varietal = varietal;
    postWine.price = price;
    postWine.description = description;
    postWine.img = img;

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

// PATCH route for exisiting wine in DB
winesRouter.patch('/:id', requireUser, async (req, res, next) => {
  const { id } = req.params;
  const { type, price, varietal, description, img } = req.body;

  const updateFields = {};

  if (type) {
    updateFields.type = type;
  }

  if (price) {
    updateFields.price = price;
  }

  if (varietal) {
    updateFields.varietal = varietal;
  }

  if (description) {
    updateFields.description = description;
  }

  if (img) {
    updateFields.img = img;
  }

  try {
    const originalWine = await getWineById(id);
console.log(originalWine.id, id)
    if (originalWine.id == id) {
      const updatedWine = await updateWine(id, updateFields);
      res.send({ post: updatedWine })
    } else {
      next({
        name: 'Error',
        message: 'Cannot update Wine'
      })
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// DELETE route for existing wine in the DB
winesRouter.delete('/:id', async (req, res, next) => {
  try {
      const wine = await deleteWine(req.params.id);
      res.send(wine);
  } catch (error) {
      next(error);
  }
});




module.exports = winesRouter;
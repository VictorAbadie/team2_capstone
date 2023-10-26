const express = require('express')
const winesRouter = express.Router();

const { createWine,
        getAllWines } = require('../db');

const jwt = require('jsonwebtoken')

winesRouter.get('/', async( req, res, next) => {
try {
const wines = await getAllWines();

res.send(wines);
} catch (error) {
    throw error
}
});

module.exports = winesRouter;
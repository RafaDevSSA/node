'use stricts'

const express = require('express');
const controller = require('../controllers/products-controller');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

var router = express.Router()

router.get('/', jsonParser, controller.get);

router.get('/:slug', jsonParser, controller.getBySlug);

router.get('/admin/:id', jsonParser, controller.getById);

router.get('/tag/:tag', jsonParser, controller.getByTag);

router.post('/', jsonParser, controller.post);

router.put('/:id',jsonParser, controller.put);

router.delete('/',jsonParser, controller.del);

module.exports = router;

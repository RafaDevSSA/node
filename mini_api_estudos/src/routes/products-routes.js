'use stricts'

const express = require('express');
const controller = require('../controllers/products-controller');
const bodyParser = require('body-parser')
const authService = require('../services/auth-service');
const jsonParser = bodyParser.json()

var router = express.Router()

router.get('/', jsonParser, controller.get);

router.get('/:slug', jsonParser, controller.getBySlug);

router.get('/admin/:id', jsonParser, controller.getById);

router.get('/tag/:tag', jsonParser, controller.getByTag);

router.post('/', jsonParser, authService.isAdmin, controller.post);

router.put('/:id', jsonParser,  authService.isAdmin, controller.put);

router.delete('/', jsonParser,  authService.isAdmin, controller.del);

module.exports = router;

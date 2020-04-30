'use stricts'

const express = require('express');
const controller = require('../controllers/order-controller');
const bodyParser = require('body-parser')
const authService = require('../services/auth-service');
const jsonParser = bodyParser.json()

var router = express.Router()

router.get('/', jsonParser, controller.get);

router.post('/', jsonParser, authService.authorize, controller.post);

module.exports = router; 
'use stricts'

const express = require('express');
const controller = require('../controllers/order-controller');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

var router = express.Router()

router.get('/', jsonParser, controller.get);

router.post('/', jsonParser, controller.post);

module.exports = router; 
'use stricts'

const express = require('express');
const controller = require('../controllers/customer-controller');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

var router = express.Router()

router.post('/', jsonParser, controller.post);

module.exports = router; 
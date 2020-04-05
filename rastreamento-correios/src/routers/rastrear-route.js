'use stricts'
const express = require('express');
const rastrearController = require('../controller/rastrear-controller');

var router = express.Router();

router.get('/:code', rastrearController.search);

module.exports = router;
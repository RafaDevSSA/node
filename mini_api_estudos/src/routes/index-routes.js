'use stricts'

const express = require('express');
var router = express.Router()


router.get('/', (req, res, next) => {
    res.status(200).send({
        'title': 'Helcome to my new node app',
        'version': '0.0.2'
    });
});

module.exports = router;
'use stricts'

const express = require('express');
const mail = require('../services/mail-service');
const sms = require('../services/sms-service');
var router = express.Router()


router.get('/', (req, res, next) => {
    sms.send('Teste', '+5571992049490').then(res => {
        console.log("entrou",res);
    })
    res.status(200).send({
        'title': 'Helcome to my new node app',
        'version': '0.0.2'
    });
});

module.exports = router;
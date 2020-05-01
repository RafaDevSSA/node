const functions = require('firebase-functions');
const express = require('express');
const { rastro } = require('rastrojs');


const app = express();


app.post('/', (req, res, next) => {
    rastro.track(req.body.code).then(tracker => {
        res.status(200).send(tracker);
    })
});

//module.exports = app;

exports.api = functions.https.onRequest(app);


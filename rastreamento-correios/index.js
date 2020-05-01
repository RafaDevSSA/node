const express = require('express');

const app = express();

//rotas
const rastrearRoute = require('./src/routers/rastrear-route');

app.use('/',rastrearRoute);

//module.exports = app;


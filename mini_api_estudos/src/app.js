const express = require('express');
const mongoose = require('mongoose');
const util = require('./config');


const app = express();

//banco
mongoose.connect(util.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

//rotas
const indexRoutes = require('./routes/index-routes');
const productsRoutes = require('./routes/products-routes');
const customersRoutes = require('./routes/customer-routes');
const orderRoutes = require('./routes/order-routes');

app.use('/', indexRoutes);
app.use('/products', productsRoutes);
app.use('/customers', customersRoutes);
app.use('/orders', orderRoutes);

module.exports = app;
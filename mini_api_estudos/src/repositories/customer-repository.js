'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Customer');
require('../models/customer');


exports.post = (costumer) => {
    return costumer.save();
}
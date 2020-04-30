'use strict'

const mongoose = require('mongoose');
const Costumer = mongoose.model('Customer');
require('../models/customer');


exports.post = (costumer) => {
    return costumer.save();
}

exports.authenticate = async (data) => {
    const customer = await Costumer.findOne({
        'email': data.email,
        'password': data.password,
    }, 'email name roles');
    return customer;
}
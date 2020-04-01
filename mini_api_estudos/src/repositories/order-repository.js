'use strict'

const mongoose = require('mongoose');
const Order = mongoose.model('Order');
require('../models/order');


exports.get = () => {
    return Order
    .find({},'status')
    .populate('customer','name')
    .populate('items.product','title');
 }

exports.post = (order) => {
    return order.save();
}
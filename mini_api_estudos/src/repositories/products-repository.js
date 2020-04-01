'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
require('../models/products');


exports.get = () => {
    return Product.find({ active: true }, 'title price image slug');
}

exports.getBySlug = (slug) => {
    return Product.findOne(
        {
            active: true,
            slug: slug
        }, 'title description tags price image slug')
}

exports.getById = (id) => {
    return Product.findOne(
        {
            active: true,
            _id: id
        },
        'title description tags price image slug')
}

exports.getByTag = (tag) => {
    return Product.find(
        {
            active: true,
            tags: tag
        },
        'title description tags price image slug')
}

exports.post = (product) => {
    return product.save();
}

exports.put = (id, product) => {
    return Product.findByIdAndUpdate(id, {
        $set: product
    });
}

exports.del = (id) => {
   return Product.findByIdAndDelete(id);
}
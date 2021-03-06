'use stricts'

const mongoose = require('mongoose');
require('../models/order');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/order-repository');
const authService = require('../services/auth-service');
const guid = require('guid');

const Order = mongoose.model('Order');

exports.get = (req, res, next) => {
    repository.get().then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(400).send({ msg: 'Falha ao cadastrar o pedido', err: err });
    });
}

exports.post = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decodeToken(token);
    let order = new Order();
    order.customer = data.id;
    order.number = guid.raw().substring(0,6);
    order.items = req.body.items
    repository.post(order).then(() => {
        res.status(201).send('Pedido criado com sucesso!');
    }).catch(err => {
        res.status(400).send({ msg: 'Falha ao cadastrar o pedido', err: err });
    });
};



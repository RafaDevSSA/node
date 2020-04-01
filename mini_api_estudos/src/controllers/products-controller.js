'use stricts'

const mongoose = require('mongoose');
require('../models/products');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/products-repository');

const Product = mongoose.model('Product');

exports.get = async (req, res, next) => {
    repository.get().then((data) => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(400).send({ msg: 'Falha ao buscar os produtos', err: err });
    });
};

exports.getBySlug = (req, res, next) => {
    repository.getBySlug(req.params.slug).then((data) => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(400).send({ msg: 'Falha ao buscar o produto', err: err });
    });
};

exports.getById = (req, res, next) => {
    repository.getById(req.params.id).then((data) => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(400).send({ msg: 'Falha ao buscar o produto', err: err });
    });
};


exports.getByTag = (req, res, next) => {
    repository.getByTag(req.params.tag).then((data) => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(400).send({ msg: 'Falha ao buscar o produto', err: err });
    });
};

exports.post = (req, res, next) => {
    const contract = validate(req.body);
    if (!contract.isValid()) {
        res.status(401).send(contract.errors()).end();
        return;
    }
    var product = build(req.body);
    repository.post(product).then(() => {
        res.status(201).send('Produto criado com sucesso!');
    }).catch(err => {
        res.status(400).send({ msg: 'Falha ao cadastrar o produto', err: err });
    });
};

exports.put = (req, res, next) => {
    const contract = validate(req.body);
    if (!contract.isValid()) {
        res.status(401).send(contract.errors()).end();
        return;
    }
    product = build(req.body);
    product._id = req.params.id;
    repository.put(req.params.id, product).then(() => {
        res.status(201).send('Produto editado com sucesso!');
    }).catch(err => {
        res.status(400).send({ msg: 'Falha ao editar o produto', err: err });
    });
}

exports.del = (req, res, next) => {
    repository.del(req.body.id).then(() => {
        res.status(201).send('Produto deletado com sucesso!');
    }).catch(err => {
        res.status(400).send({ msg: 'Falha ao deletar o produto', err: err });
    });
}

const build = (body) => {
    const product = new Product();
    product.title = body.title;
    product.description = body.description;
    product.image = body.image;
    product.slug = body.slug;
    product.tags = body.tags;
    product.active = body.active;
    product.price = body.price;
    return product;
}

const validate = (body) => {
    let contract = new ValidationContract();
    contract.hasMinLen(body.title, 5, 'Titulo deve ter no minimo 5 caracteres');
    contract.hasMinLen(body.description, 20, 'Descrição deve ter no minimo 20 caracteres');
    contract.hasMinLen(body.slug, 5, 'Slug deve ter no minimo 5 caracteres');
    return contract;
}
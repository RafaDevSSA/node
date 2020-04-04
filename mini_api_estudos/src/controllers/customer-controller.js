'use stricts'

const mongoose = require('mongoose');
require('../models/customer');
const ValidationContract = require('../validators/fluent-validator');
const md5 = require('md5');
const repository = require('../repositories/customer-repository');
const mail = require('../services/mail-service');
const authService = require('../services/auth-service');

const Customer = mongoose.model('Customer');

exports.post = (req, res, next) => {
    const contract = validate(req.body);
    if (!contract.isValid()) {
        res.status(401).send(contract.errors()).end();
        return;
    }
    var costumer = build(req.body);
    repository.post(costumer).then(() => {
        mail.send(req.body.email, 'Roupa de Bebê', req.body.name + ' Bem vindo(a) a mais nova comunidade de doação e vendas de roupas de bebê!');
        res.status(201).send('Usuário criado com sucesso!');
    }).catch(err => {
        res.status(400).send({ msg: 'Falha ao cadastrar o usuário', err: err });
    });
};

exports.authenticate = async (req, res, next) => {
    const data = {
        email: req.body.email,
        password: md5(req.body.password+global.SALT_KEY)
    }
    const customer = await repository.authenticate(data);
    if(!customer){
        res.status(401).send('Usuário não encontrado');
        return false;
    }

    const token = await authService.generateToken({
        "id": customer._id,
        "name":customer.name,
        "email":customer.email,
        "roles":customer.roles
    });

    res.status(200).send({
        "token":token,
        "customer":{
            "name":customer.name,
            "email":customer.email,
            "rule":customer.role
        }
    })
}


const build = (body) => {
    const costumer = new Customer();
    costumer.name = body.name;
    costumer.email = body.email;
    costumer.password = md5(body.password + global.SALT_KEY);
    return costumer;
}

const validate = (body) => {
    let contract = new ValidationContract();
    contract.hasMinLen(body.name, 10, 'Nome deve ter no minimo 10 caracteres');
    contract.isEmail(body.email, 20, 'Email inválido');
    contract.hasMinLen(body.password, 5, 'Senha deve ter no minimo 5 caracteres');
    return contract;
}
'use stricts'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: [true, 'Já existe uma conta usando este email!'],
    },

    password: {
        type: String,
        required: true,
        trim: true
    },
    roles: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true
    }
});

module.exports = mongoose.model('Customer', schema);
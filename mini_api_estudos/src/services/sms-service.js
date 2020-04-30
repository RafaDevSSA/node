'use strict'

const client = require('twilio')(global.SMSSID, global.SMSTOKEN);

exports.send = (msg, to) => {
    console.log('chegou aqui');
    return client.messages
        .create({
            body: msg,
            from: '(817) 985-3036',
            to: to
        });
}
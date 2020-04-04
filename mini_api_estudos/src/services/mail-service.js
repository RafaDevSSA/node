'use strict'

const sgMail = require('@sendgrid/mail');
const util = require('../config')

exports.send = (to, subject, text) => {
    sgMail.setApiKey(util.sendgridKey);
    const msg = {
        to: to,
        from: 'rdev@example.com',
        subject: subject,
        text: text,
        html: global.EMAIL_TMP
    };
    sgMail.send(msg);
}

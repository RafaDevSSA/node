'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');
const cors = require('cors')({ origin: true });

admin.initializeApp();

exports.version = functions.https.onRequest((req, res) => {
    res.status(201).send({
        version: '0.0.5',
        info: 'Send conference link - functions - email sendgrid, email sendgrid with generate living room'
    });
});


exports.email = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        var remetente = req.body.remetente;
        var assunto = req.body.assunto;
        var destinatarios = req.body.destinatarios; // lista de e-mails destinatarios separados por ,
        var corpo = req.body.corpo;
        var corpoHtml = req.body.html;

        sgMail.setApiKey(functions.config().sendlinkmail.key);
        const msg = {
            from: remetente,
            to: destinatarios,
            subject: assunto,
            text: corpo,
            html: corpoHtml
        };

        (async () => {
            try {
                await sgMail.send(msg);
                res.status(201).send('ok');
            } catch (err) {
                res.status(500).send(err.toString());
            }
        })();



        /*var transporter = nodemailer.createTransport({
            service: 'smtp.sendgrid.net',
            port: 465,
            auth: {
                user: 'apikey',
                pass: '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'
            }
        });

        var remetente = req.body.remetente;
        var assunto = req.body['assunto'];
        var destinatarios = req.body['destinatarios']; // lista de e-mails destinatarios separados por ,
        var corpo = req.body['corpo'];
        var corpoHtml = req.body['corpoHtml'];

        var email = {
            from: remetente,
            to: destinatarios,
            subject: assunto,
            text: corpo,
            html: corpoHtml
        };

        transporter.sendMail(email, (error, info) => {
            if (error) {
                res.status(500).send(error);
            }
            res.status(201).send('Mensagem %s enviada: %s', info.messageId, info.response);
        });*/
    });
});


exports.emailWithGenerateLink = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        var room = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 8; i++ ) {
           room += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        var remetente = req.body.remetente;
        var assunto = req.body.assunto;
        var destinatarios = req.body.destinatarios; // lista de e-mails destinatarios separados por ,
        var corpo = req.body.corpo;
        var corpoHtml = req.body.html;

        corpoHtml+=`<p><a href='https://talky.io/${room}'>Acessar</a></p>`;

        sgMail.setApiKey(functions.config().sendlinkmail.key);
        const msg = {
            from: remetente,
            to: destinatarios,
            subject: assunto,
            text: corpo,
            html: corpoHtml
        };

        (async () => {
            try {
                await sgMail.send(msg);
                res.status(201).send({link:`https://talky.io/${room}`});
            } catch (err) {
                res.status(500).send(err.toString());
            } 
        })();
    });
});
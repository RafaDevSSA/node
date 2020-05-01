'use strict'
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();


const port = normalizePort(process.env.PORT || 3000);

app.on('error', onError);
app.on('listening', onListening);


function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

app.use('/send', (req, res, next) => {
    console.log('here');
    var transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port:2525,
        auth: {
            user: 'ecf30801e19bd4',
            pass: '0472c8abe53a1a'
        }
    });

    var mailOptions = {
        from: 'santanarafael16@gmail.com',
        to: 'rafadevteam@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

app.listen(port, () => console.log('On port 3000'));

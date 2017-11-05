#!/usr/bin/env node


const http = require('http');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const api = require('./routes/api');

const Irc = require('./irc/index');

const irc = new Irc();
//irc.send('officetv', 'KEY_POWER');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', api);

app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    })
});

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

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

function onError(error)
 {
     if (error.syscall !== 'listen') {
         throw error;
     }

     const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCESS':
            console.error(bind + 'requires elevated priviliedges');
            process.exit(1);
            break;
        case 'EADDRINUSE' :
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
    console.log('Listening on ' + bind);
 }

// app.get('/', (req, res) => {
//     //irc_call('officetv', 'KEY_POWER')
//     res.json({ message: 'Turned TV Off or On!'});
// });

// app.listen(process.env.PORT || 8080);
// console.log(`Listening on port ${process.env.PORT || 8080}`)











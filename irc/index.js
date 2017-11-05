"use strict";
const nodeLIRC = require('node-lirc');


class Irc {

    constructor() {
        nodeLIRC.init();
    }

    send(location, action) {
        console.log(`Sending key: ${action}`);
        nodeLIRC.send(location, action);
    }
}

module.exports = Irc;

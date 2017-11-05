var nodeLIRC = require('node-lirc');

nodeLIRC.init();

console.log(nodeLIRC.remotes);
//nodeLIRC.send("officetv", "KEY_POWER");
nodeLIRC.send("officetv", "KEY_1");
nodeLIRC.send("officetv", "KEY_1");
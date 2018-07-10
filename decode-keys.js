'use strict';
const fs = require('fs'),
  enigma = require('./enigma');

let auth = fs.readFileSync('./enigmas/config', 'utf8');
auth = enigma.decrypt(auth);
fs.writeFile('./config.json', auth);

let gAuth = fs.readFileSync('./enigmas/service-key', 'utf8');
gAuth = enigma.decrypt(gAuth);
fs.writeFile('./service-key.json', gAuth);

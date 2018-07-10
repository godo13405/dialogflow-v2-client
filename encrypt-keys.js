'use strict';
const fs = require('fs'),
  enigma = require('./enigma');

let auth = fs.readFileSync('./config.json', 'utf8');
auth = enigma.encrypt(auth);
fs.writeFile('./enigmas/config', auth);

let gAuth = fs.readFileSync('./service-key.json', 'utf8');
gAuth = enigma.encrypt(gAuth);
fs.writeFile('./enigmas/service-key', gAuth);

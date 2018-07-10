'use strict';
// Nodejs encryption with CTR
const crypto = require('crypto'),
  algorithm = 'aes-128-ctr',
  iv = new Buffer('sonnco82b58dask4', 'utf8'),
  salt = "foobar",
  hash = crypto.createHash("sha1");
hash.update(salt);
const key = hash.digest().slice(0, 16);

module.exports = {
  encrypt: text => {
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let crypted = cipher.update(text, 'utf8', 'binary');
    crypted += cipher.final('binary');
    return crypted;
  },
  decrypt: text => {
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let dec = decipher.update(text, 'binary', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }
};

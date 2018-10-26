'use strict';

const crypto = require('crypto');

//const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bytes (32 characters)

const ENCRYPTION_KEY = "9vApxLk5G3PAsJrM9vApxLk5G3PAsJrM";
const IV_LENGTH = 16; // For AES, this is always 16

function encrypt(text) {
  
  console.log(ENCRYPTION_KEY);
  console.log('In encrypt ' + text);

  let iv = crypto.randomBytes(IV_LENGTH);

  console.log("before cipher");
  let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
  
  console.log("before encrypted");
  let encrypted = cipher.update(text);

  console.log("encrypte1");
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  console.log("encrypted2");
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
  let textParts = text.split(':');
  let iv = new Buffer(textParts.shift(), 'hex');
  let encryptedText = new Buffer(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

module.exports = { decrypt, encrypt };
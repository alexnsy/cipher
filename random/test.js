var tools = require('./encrypt.js');

const message ="Alex Hahaha";

var encrypted_msg = tools.encrypt('alex');
console.log(encrypted_msg);
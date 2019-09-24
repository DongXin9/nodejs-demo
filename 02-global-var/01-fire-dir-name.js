#!/usr/bin/node
console.log('file name:',__filename);
console.log('dir name:',__dirname);
var filename = __dirname+'/';
const path = require('path');
filename = path.join(__dirname,'views','login.html');
console.log('fileName:',filename);

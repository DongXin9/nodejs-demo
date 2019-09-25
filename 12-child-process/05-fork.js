#!/usr/bin/node
const cp = require('child_process');
console.log('I am father process id : %d:',process.pid);
var child = cp.fork('./02-child.js');
global.setTimeout(function(){
  child.send('Hello I am your father!');
},2000);


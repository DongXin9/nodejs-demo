#!/usr/bin/node
const cp = require('child_process');
console.log('I am father with id:',process.pid);
var child = cp.spawn('./02-child.js',[]);
child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);
global.setTimeout(function(){
  console.log('father bye!');
  process.exit();
},5000);

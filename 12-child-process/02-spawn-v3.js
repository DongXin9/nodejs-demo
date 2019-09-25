#!/usr/bin/node
const http = require('http'),
      cp = require('child_process');
http.createServer((rea, res) => {
  var child = cp.spawn('./02-child.js',[]);
  child.stdout.pipe(res);
}).listen(8080);

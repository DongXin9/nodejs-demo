#!/usr/bin/node
const http = require('http');
http.createServer((rea, res) => {
  res.end('hello world');
}).listen(8080);

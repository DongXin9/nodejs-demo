#!/usr/bin/node

const Read = require('stream').Readable;

var r = new Read();

var c = 'a'.charCodeAt(0);
r._read = () => {
  r.push(String.fromCharCode(c++));
  if(c>'z'.charCodeAt(0)) r.push(null);
};
r.pipe(process.stdout);

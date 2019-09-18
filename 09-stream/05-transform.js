#!/usr/bin/node
const transfrom = require('stream').Transform;
process.stdin.setEncoding('utf8');
var tsf = new transfrom();
tsf._transform = function(chunk,encoding,callback){
  this.push(Buffer(chunk.toString('utf8').toUpperCase()));
  callback();
};
process.stdin.pipe(tsf).pipe(process.stdout);

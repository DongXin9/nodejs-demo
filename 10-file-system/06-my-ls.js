#!/usr/bin/node
const fs = require('fs'),
      dir = process.argv[2] || __dirname;
//readdirSync同步方法
console.log(fs.readdirSync(dir));
//fs.statSync(dir + content).

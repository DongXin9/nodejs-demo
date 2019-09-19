#!/usr/bin/node
const fs = require('fs'),
      dir = process.argv[2] || __dirname;
//readdirSync同步方法
try{
  console.log(fs.readdirSync(dir));
}catch(err){
  console.error(err.message);
  process.exit(1);
}

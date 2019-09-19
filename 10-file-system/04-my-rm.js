#!/usr/bin/node
const fs = require('fs'),
      file = process.argv[2];
if(fs.existsSync(file)){
  //判断是否是目录，若是目录，则忽略
  if(fs.statSync(file).isFile()) fs.unlinkSync(file);
}else{
  console.error('%s not exist!',file);
  process.exit(1);
}

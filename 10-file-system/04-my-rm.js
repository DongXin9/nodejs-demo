#!/usr/bin/node
const fs = require('fs'),
      file = process.argv[2];
if(fs.existsSync(file)){
  fs.unlinkSync(file);
}else{
  console.error('%s not exist!',file);
  process.exit(1);
}

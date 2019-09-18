#!/usr/bin/node
const fs = require('fs'),
      src = process.argv[2],
      dst = process.argv[3];
try{
  fs.renameSync(src,dst);
}catch(e){
  console.log(e.message);
  process.exit(1);
}

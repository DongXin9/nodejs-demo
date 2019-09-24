#!/usr/bin/node

const fs = require('fs'),
      mod = process.argv[2],
      dst = process.argv[3];

//fs.chmodSync(dst, Number(mod));
try{
  fs.chmodSync(dst, parseInt(mod, 8));
}
catch(err){
  console.error(err.message);
  process.exit(2);
}

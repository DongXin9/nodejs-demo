#!/usr/bin/node
const fs = require('fs'),
      file = process.argv[2] || __filename;
/*if(fs.existsSync(file)){
console.log(fs.readFileSync(file).toString('utf8'));
}else{
  console.log('%s not exist!',file);
  process.exit(1);
}*/
try{
  console.log(fs.readFileSync(file).toString('utf8'));
}catch(err){
  console.error(err.message);
  process.exit(1);
}


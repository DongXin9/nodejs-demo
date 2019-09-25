#!/usr/bin/node
const cp = require('child_process');
var cmd = '';
for(var i = 2;i<process.argv.length;i++){
  cmd += (process.argv[i] + ' ');
}
cp.exec(cmd,function(err,out,error){
  if(err){
    console.error(err.message);
    process.exit(1);
  }
  console.log(out);
});

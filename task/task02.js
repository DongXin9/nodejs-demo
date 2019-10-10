#!/usr/bin/node
const fs = require('fs'),
      command = process.argv[2],
      fl = process.argv[3];

switch(command){
  case 'list':
    try{
      const files = fs.readdirSync(__dirname).filter(item => {
        return fs.statSync(item).isFile();
      });
      var filelist = [];
      for(var i = 0;i < files.length;i++){
        var list = {
          'fileName':files[i],
          'fileSize':fs.statSync(files[i]).size+''
        };
        filelist.push(list);
      } 
      var jsonlist = JSON.stringify(filelist,null,' ');
      console.log(jsonlist);
      var jsonObj = JSON.parse(jsonlist);
      console.log(jsonObj);
    }catch(err){
      cosnole.error(err.message);
      process.exit(1);
    }
    break;
  case 'mkdir':
    if(typeof(fl)==='undefined'){
      console.log('命令行参数错误!');
      process.exit(1);
    }
    fs.mkdirSync(fl);
    break;
  default:
    console.log('命令行参数错误!');   
}


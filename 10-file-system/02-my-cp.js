const fs = require('fs'),
      src = process.argv[2],
      dst = process.argv[3];
var sta,stm;
//src.pip(dst);
//src = fs.createReadStream
//dst = fs.createWriteStream;
if(fs.existsSync(src)){
  stm = fs.createReadStream(src).pipe(fs.createWriteStream(dst));
    //复制x权限
    //stm.on('close',()=>{
    //  sta = fs.statSync(src);
    //  fs.chmodSync(dst,sta.mode);
    //});         
}else{            
  console.error('%s not exist!',src);
              
  process.exit(1);              
};

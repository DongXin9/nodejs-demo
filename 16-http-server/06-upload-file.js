#!/usr/bin/node

const http = require('http'),
      qs = require('querystring'),
      fs = require('fs'),
      log = console.log;

http.createServer((req, res) => {
  //打印请求起始行、请求头打印、空行
  log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
  log(req.headers);
  log();
  //请求体的打印
  //req.pipe(process.stdout);
  //对请求体进行解析
  var f1 = '';
  req.setEncoding('binary');
  req.on('data',(data)=>{
    f1 += data;
  });
  req.on('end',()=>{
    //step 1:parse f1
    //step 1.1:get file name
    
    var filename = qs.parse(f1.split('\r\n')[1].split(';')[2].trim()).filename;
    filename = filename.slice(1,filename.length-1);
    log(filename);
    //step 1.2:get file data
    var filedata = f1.split('\r\n')[4];
    log(filedata);
    //log(new Buffer(f1.split('\r\n')[4]).toString('utf8'));
    
    
    //step 2:
    fs.writeFileSync(filename, filedata, {'encoding': 'binary'});
  });
  if(req.url === '/') res.end('OK!'); 

}).listen(8080);

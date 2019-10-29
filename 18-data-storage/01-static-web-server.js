#!/usr/bin/node

const http = require('http'),
      fs = require('fs');

var buf = {};


http.createServer((req, res) => {
  if(req.url === '/favicon.ico') return;
  var fileName = __dirname + req.url;
  console.log(fileName);
  //res.end(fs.readFileSync(fileName).toString('utf8'));
  
  if(!fs.existsSync(fileName)) return;
  if(!buf[fileName]){
    console.log('read file');
    buf[fileName] = fs.readFileSync(fileName);
  }

  res.end(buf[fileName]);
}).listen(8080);
console.log(process.pid);

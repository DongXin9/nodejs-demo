#!/usr/bin/node
//const http = require('http');
const addr = 'http://www.sian.com/',
      http = require('http');
var isOK = false;
do{
  http.get(addr,function(res){
    //print start line
    console.log(`HTTP/${res.httpVersion} ${res.statusCode} ${res.statusMessage}`);
    //print response header
    console.log(res.headers);
    console.log('');
    //print response body
    res.pipe(process.stdout);
  });
  isOK = true;
}while(!isOK);
process.exit();

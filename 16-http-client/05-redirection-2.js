#!/usr/bin/node
//const http = require('http');
const addr = 'http://www.sian.com/',
      http = require('http');
function get(){
  http.get(addr,function(res){
    //print start line
    console.log(`HTTP/${res.httpVersion} ${res.statusCode} ${res.statusMessage}`);
    //print response header
    console.log(res.headers);
    console.log('');
    //print response body
    if(res.statusCode < 400 && res.statusCode >= 300){
      get(res.headers.location);
    }else{
      res.pipe(process.stdout);
    }
  });
}
get(addr); 

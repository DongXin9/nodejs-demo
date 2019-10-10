#!/usr/bin/node

const http = require('http'),
      log = console.log;

http.createServer((req, res) => {
  log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
  log(req.headers);
  log();
  req.pipe(process.stdout);

  var html = '<!DOCTYPE html><html><head><title>Hello</title><head><body><h1>Hello world!</h1></body></html>';
  if(req.url === '/'){
    //200 ok
    res.writeHead(200,{"Content-Type":'text/html','Content-length':Buffer.byteLength(html,'utf8')});
   res.end(html);    
  }else{
    //404 not found
    res.statusCode = 404;
    res.setHeader('Content-Type','text/plain');
    res.end('error');
  }
  res.end('OK!');
}).listen(8080);

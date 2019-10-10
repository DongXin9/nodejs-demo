#!/usr/bin/node
const http = require('http'),
      url = require('url'),
      qs = require('querystring'),
      log = console.log;
var items = ['eat'];
http.createServer((req, res) => {
  log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
  log(req.headers);
  log();
  if(req.url === '/'){
    //200 ok
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(getHTML());    
                      
  }else{
    //404 not found
    //res.statusCode = 404;
    //res.setHeader('Content-Type','text/plain');
    //res.end('error');
    var it = url.parse(req.url).query;
    if(typeof(it) != 'undefined'){
      items.push(it);
    }
    res.end(getHTML());
                                  
  }
  res.end('OK!');
}).listen(8080);
function getHTML(){
  return ''
  +'<!DOCTYPE html>'
  +'<html>'
  +'<head>'
  +'<title>TODO LIST</title>'
  +'<head>'
  +'<body>'
  +'<h1>TODO LIST</h1>'
  +'<ul>'
  +items.map(function(it){return '<li>'+it+'</li>';}).join('\n')
  +'</ul>'
  +'<form method="GET" action="/">'
  +'<input type="text" name="item">'
  +'<input type="submit" value="提交">'
  +'</form>'
  +'</body>'
  +'</html>';
}


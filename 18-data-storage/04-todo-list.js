#!/usr/bin/node
const http = require('http'),
      qs = require('querystring'),
      log = console.log,
      mysql = require('mysql'),
      con = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'ddd',
        database:'test'
      });
con.connext();
var items = ['eat'];
http.createServer((req, res) => {
  log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
  log(req.headers);
  log('');
  if(req.method === 'GET' && req.url === '/'){
    //200 ok
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(getHTML());                                  
  }else if(req.method === 'POST' && req.url === '/'){
    //submit data
    var it = '';
    req.on('data',(data)=>{
      it += data;
    });
    req.on('end',()=>{
      if(typeof it != 'undefined'){
        items.push(qs.parse(it).item);
      }
      res.end(getHTML());
    });
                          
  }else{
    //error
    res.end('error!');
  }
}).listen(8080);
function getHTML(){
  return '<!DOCTYPE html>'
    +'<html>'
    +'<head>'
    +'<title>TODO LIST</title>'
    +'<head>'
    +'<body>'
    +'<h1>TODO LIST</h1>'
    +'<ul>'
    +items.map(function(item){return '<li>'+item+'</li>';}).join('\n')
    +'</ul>'
    +'<form method="POST" action="/">'
    +'<input type="text" name="item">'
    +'<input type="submit" value="add item">'
    +'</form>'
    +'</body>'
    +'</html>';

}
function select(){
  con.query('insert into books(book_id,title,status) values(?,?,?)',['104','node.js',0],(err, result)=>{
    if(err){
      console.error(err.message);
      process.exit(1);
    }

    process.exit();
  });

}
function insert(){
  con.query('insert into books(book_id,title,status) values(?,?,?)',['104','node.js',0],(err, result)=>{
    if(err){
      console.error(err.message);
      process.exit(1);
    }
    process.exit();
  });

}

             




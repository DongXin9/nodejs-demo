#!/usr/bin/node

const http = require('http'),
      log  = console.log,
      qs   = require('querystring'),
      url = require('url'),
      fs = require('fs');

var items = [];
var isLogin;
http.createServer((req, res) => {
  
  if(typeof req.headers['cookie'] === 'undefined') {
    isLogin = false;
  } else {
    var pair = req.headers['cookie'].split('=');
    isLogin = (pair[1] === 'true');
  }

  var urls = url.parse(req.url,true);
  log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
  log(req.headers);
  log('');

  switch(req.method) {

    case 'GET':
      if(urls.pathname === '/list'){
        log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
        list(res);
        break;
      }
      else if(urls.pathname === '/listmanager'){
        listmanager(res);
        break;
      }else if(urls.pathname === '/addChapter'){
        addChapter(res);
        break;
      }
      else if(req.url != '/') {
        log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
        res.writeHead(200,{'Content-type':"text/css"});
        fs.readFile('.'+req.url, function(err, data) {
            if (err) {
                console.error(err);
            }else{
                res.end(data);
            }
        });
        return;
      }
      // else{
        // log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
        // var a = fs.readFileSync('.'+req.url).toString('utf8');
        // var b = req.url.split('.');
        // var c = b[1];
        // if(c == 'css'){
        //   res.writeHead(200,{
        //     'Content-Type':'text/css',
        //     'Content-Length': Buffer.byteLength(a),
        //     'Access-Control-Allow-Origin': '*'
        //   });
        //   res.end(a);
        //   break;
        // }else if(c == 'jpg'){
        //   res.writeHead(200,{
        //     'Content-Type':'image/png',
        //     'Content-Length': Buffer.byteLength(a),
        //     'Access-Control-Allow-Origin': '*'
        //   });
        //   res.end(a);
        //   break;
        
        // }else if(b[1] == 'jpeg'){
        //   res.writeHead(200,{
        //     'Content-Type':'image/jpeg',
        //     'Content-Length': Buffer.byteLength(a),
        //     'Access-Control-Allow-Origin': '*'
        //   });
        //   res.end(a);
        //   break;
        // }else{
        //   res.writeHead(200,{
        //     'Content-Type':'image/jpg',
        //     'Content-Length': Buffer.byteLength(a),
        //     'Access-Control-Allow-Origin': '*'
        //   });
        //   res.end(a);
        //   break;
        
        // }
        
        
      // }
      

    case 'POST':
      if(urls.pathname === '/addChapter'){
        add(req, res);
      }else if(urls.pathname === '/login'){
        req.on('data',(chunk)=>{data += chunk;});
        req.on('end',()=>{
          var account = qs.parse(data);
          if(account.username === 'wangding' && account.pwd === '123') {
            console.log('user: %s, password: %s', account.username, account.pwd);
            isLogin = true;
            addChapter(res);
            
          } else {
            login(res);
            
          }
        })
        break;
      }
      
      break;

    default:
      err(res);
      break;
  }
}).listen(8080);

function list(res){
  var html = fs.readFileSync('./chapterList.html').toString('utf8');
  res.writeHead(200,{
    'Content-Type':'text/html',
    'Content-Length': Buffer.byteLength(html),
    'Access-Control-Allow-Origin': '*'
  });
  res.end(html);
}
function listmanager(res){
  var html = fs.readFileSync('./list.html').toString('utf8');
  res.writeHead(200,{
    'Content-Type':'text/html',
    'Content-Length': Buffer.byteLength(html),
    'Access-Control-Allow-Origin': '*'
  });
  res.end(html);
}
function addChapter(res){
  var html = fs.readFileSync('./addChapter.html').toString('utf8');
  res.writeHead(200,{
    'Content-Type':'text/html',
    'Content-Length': Buffer.byteLength(html),
    'Access-Control-Allow-Origin': '*'
  });
  res.end(html);
}
function add(req, res) {
  var body = '';

  req.on('data', function(chunk) { body += chunk; });
  req.on('end', function() {
    log(body);
    
    if(body != '') {
      items.push(qs.parse(body).item);
    }

    listmanager(res);
  });
}
function login(res){
  var html = fs.readFileSync('./login.html').toString('utf8');
  res.writeHead(200,{
    'Content-Type':'text/html',
    'Content-Length': Buffer.byteLength(html),
    'Access-Control-Allow-Origin': '*'
  });
  res.end(html);
}
// function css(req,res){
//   var a = fs.readFileSync('./css/'+req.url).toString('utf8');
//   res.writeHead(200,{
//     'Content-Type':'text/css'
//   })
//   res.end(a);
// }
// function show(res) {

//   var html = '<!DOCTYPE html>\n'
//             + '<html>\n'
//             + '  <head>\n'
//             + '    <meta charset="UTF-8">\n'
//             + '    <title>Todo list</title>\n'
//             + '  </head>\n'
//             + '  <body>\n'
//             + '    <h1>Todo List</h1>\n'
//             + '    <form method="post" action="/">\n'
//             + '       <p><input type="text" name="item" />'
//             + '       <input type="submit" value="Add Item" /></p>\n'
//             + '    </form>\n'
//             + '    <ul>\n'
//             + items.map(function(item) {return '      <li>' + item + '</li>';}).join('\n')
//             + '    </ul>\n'
//             + '  </body>\n'
//             + '</html>';

//   res.setHeader('Content-Type', 'text/html');
//   res.setHeader('Content-Length', Buffer.byteLength(html));

//   res.statusCode = 200;
//   res.end(html);
// }



function err(res) {
  var msg = 'Not found!';

  res.statusCode = 404;
  res.setHeader('Content-Length', msg.length);
  res.setHeader('Content-Type', 'text/plain');

  res.end(msg);
}
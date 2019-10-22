#!/usr/bin/node

const http = require('http'),
      log = console.log;

http.createServer((req, res) => {
  log(`${req.method} ${req.url} ${req.httpVersion}`);
  log('req.headers:',req.headers);
  log();

  switch(req.url){
    case '/admin':
      var auth = req.headers.authorization;
      if(typeof auth !== 'undefined'){
        var usr = getUserNamePwd(auth);
        if(usr.username === 'wangding' && usr.password === '123'){
          showSecret(req,res);
        }else{
          //res.statusCode = 401;
          //res.setHeader('www-authenticate','basic');
          showNormal(res);
        }
      }
      else{
        res.statusCode = 401;
        res.setHeader('www-authenticate','basic');
        showNormal(res);
      }
      break;
    default:
      showNormal(res);
      break;
  }
  //var auth = req.headers.authorization;
  //getUserNamePwd(auth);
  res.end('OK!');
}).listen(8080);
function showSecret(req,res){
  res.end('Hello! I am wangding with mobile 233');
}
function showNormal(res){
  res.end('Hello! A good day');
}
function getUserNamePwd(auth){
  //log('authorization',auth);
  if(typeof auth !== 'undefined'){
    var ath = auth.split(' ');
    if(ath[0] === 'Basic'){
      var buf = new Buffer(ath[1],'base64');
      var usr = buf.toString('utf8').split(':');
      log('username',usr[0]);
      log('password',usr[1]);
    }
  }
  return{
    username:usr[0],
    password:usr[1]
  }
}

#!/usr/bin/node

const http = require('http'),
      qs   = require('querystring'),
      fs = require('fs');

http.createServer((req, res) => {
  if(req.method === 'POST' && req.url === '/login') {
    showHome(req,res);
  }else if(req.method === 'GET' && req.url === '/login') {
    showLogin(res);
  }else{
    res.statusCode = 404;
    res.end('Pages ERROR');
  }
}).listen(8081);

//登录页面显示
function showLogin(res) {
  var html = fs.readFileSync('login.html').toString('utf8');
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 200;
  res.end(html);
}

//登录提交验证
function showHome(req,res){
  var data = '';
  req.on('data', (chunk) => { data += chunk; });
  req.on('end', () => {
    var account = qs.parse(data);
    if(account.username === 'zhangsan' && account.pwd === '123') {
      // console.log('username: %s, pwd: %s', account.username, account.pwd);
      if(typeof req.headers['cookie'] === 'undefined') {
        logincount = 1;
      } else {
        var pair = req.headers['cookie'].split('=');
        logincount = Number(pair[1]) + 1;
      }
      res.statusCode = 200;
      res.setHeader('Set-cookie', `logincount=${logincount}; max-age=10000000`);
      res.end(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>登录成功界面</title></head><body><p>${account.username}这是您第 ${logincount} 次登录</p></body></html>`);
    } else {
      res.statusCode = 404;
      res.end(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>登录错误页面</title></head><body><p>用户名或者密码错误，请重新登录</p></body></html>`);
    }
  });
}


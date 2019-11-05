#!/usr/bin/node

const http = require('http'),
      log  = console.log,
      qs   = require('querystring'),
      url = require('url'),
      fs = require('fs'),
      path = require('path');
const {chapterList, userList} = require('./data.js');


http.createServer((req, res) => {
  

  var urls = url.parse(req.url,true);
  log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
  log(req.headers);
  log('');

  switch(req.method) {
    case 'GET':
      //前台获取文章列表
      if(urls.pathname === '/list'){
        log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
        list(res);
        break;
      }
      else if(urls.pathname === '/listmanager'){
        //后台文章列表页面显示
        listmanager(res);
        break;
      }
      else if(urls.pathname === '/addChapter'){
        //后台添加文章页面显示
        addChapter(res);
        break;
      }else if(urls.pathname === '/login'){
        //登录页面显示
        getlogin(res);
        break;
      }else if(req.url == '/chapterList'){
        //获取data.js中chapterList的数据
        res.write(JSON.stringify(chapterList));
        res.end();
      }else if(urls.pathname === '/detail'){
        //阅读全文文章详情页页面显示
        detail(res);
        break;
      }else if(urls.pathname == '/getDetail'){
        //阅读全文文章详情页页面获取
        // let id=urls.query.chapterId-1;
        // console.log(urls.query);
        // console.log(id);
        let ch = chapterList[urls.query.chapterId-1];
        res.writeHead(200,{'Content-Type':'text/json'});
        res.end(JSON.stringify(ch));
      }
      //js、css、images
      else if(req.url != '/') {
        els(req,res);
        return;
      }
      else{
        err(res);
        break;
      }
    case 'POST':
      if(req.url === '/add'){
        add(req, res);
        break;
      }else if(req.url === '/login'){
        login(req,res);
        break;
      }
      else{
        console.log('ERROR');
      }
      break;
    default:
      err(res);
      break;
  }
}).listen(8083);
//css、js、images
function els(req,res){
  fs.readFile('.'+req.url, function(err, data) {
        if (err) {
            console.error(err);
        }else{
            res.end(data);
        }
    });
}
//前台列表页面显示
function list(res){
  var html = fs.readFileSync('./chapterList.html').toString('utf8');
  res.writeHead(200,{
    'Content-Type':'text/html',
    'Content-Length': Buffer.byteLength(html),
    'Access-Control-Allow-Origin': '*'
  });
  res.end(html);
}
//后台文章列表页面显示
function listmanager(res){
  var html = fs.readFileSync('./list.html').toString('utf8');
  res.writeHead(200,{
    'Content-Type':'text/html',
    'Content-Length': Buffer.byteLength(html),
    'Access-Control-Allow-Origin': '*'
  });
  res.end(html);
}
//后台添加文章页面显示
function addChapter(res){
  var html = fs.readFileSync('./addChapter.html').toString('utf8');
  res.writeHead(200,{
    'Content-Type':'text/html',
    'Content-Length': Buffer.byteLength(html),
    'Access-Control-Allow-Origin': '*'
  });
  res.end(html);
}
//添加文章
function add(req, res) {
  let item = '';
  var data = '';
  req.on('data', (chunk) => { data += chunk; });
  req.on('end',()=>{
    item = qs.parse(data.toString('utf8'));
    let items = {
      chapterId: chapterList.length+1,
      chapterName: item.title || '',
      imgPath: item.imgPath || undefined,
      chapterDes: item.content || '',
      chapterContent: item.content || '',
      publishTimer: new Date(),
      author: 'admin',
      views: 1,
    }
    chapterList.push(items);
  })
  res.write(JSON.stringify(chapterList));
  res.statusCode = 200;
  res.end('OK');
}
//登录页面显示
function getlogin(res){
  var html = fs.readFileSync('./login.html').toString('utf8');
  res.writeHead(200,{
    'Content-Type':'text/html',
    'Content-Length': Buffer.byteLength(html),
    'Access-Control-Allow-Origin': '*'
  });
  res.end(html);
}
//登录验证
function login(req,res){
  var data = '';
  var isLogin = false;
  req.on('data', (chunk) => { data += chunk; });
  req.on('end', ()=>{
    var account = qs.parse(data.toString('utf8'));
    userList.map((item)=>{
      if(item.username == account.username && item.pwd == account.pwd){
        isLogin = true;
        res.statusCode = 200;
        res.end('OK');
      }
    });
    if(isLogin === false){
      res.statusCode = 404;
      res.end('error!');
    }
      
  });
}
//文章详情页显示
function detail(res){
  var html = fs.readFileSync('./chapter.html').toString('utf8');
  res.writeHead(200,{
    'Content-Type':'text/html',
    'Content-Length': Buffer.byteLength(html),
    'Access-Control-Allow-Origin': '*'
  });
  res.end(html);   
}

//错误
function err(res) {
  var msg = 'Not found!';

  res.statusCode = 404;
  res.setHeader('Content-Length', msg.length);
  res.setHeader('Content-Type', 'text/plain');

  res.end(msg);
}
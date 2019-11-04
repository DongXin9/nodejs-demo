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
        listmanager(res);
        break;
      }
      else if(urls.pathname === '/addChapter'){
        addChapter(res);
        break;
      }else if(urls.pathname === '/login'){
        getlogin(res);
        break;
      }else if(req.url == '/chaplist/'){
        //获取data.js中chapterList的数据
        res.write(JSON.stringify(chapterList));
        res.end();
      }else if(urls.pathname === '/detail'){
        //阅读全文文章详情页页面显示

        detail(res);
        break;
      }else if(urls.pathname == '/getDetail'){
        //阅读全文文章详情页页面获取
        let id=urls.query.chapterId-1;
        console.log(urls.query);
        console.log(id);
        let ch = chapterList[id];
        console.log(ch);
        res.writeHead(200,{'Content-Type':'text/json'});
        // for(let i = 0; i < chapterList.length; i++){
        //   if(chapterList[i].chapterId == id){

        //     break;
        //   }
        // }
        // res.write(JSON.stringify(chapterList[i]));
        res.end(JSON.stringify(ch));
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
  req.on('data',(data)=>{
    item += data;
  });
  req.on('end',()=>{
    item = qs.parse(item.toString('utf8'));
    let items = {
      chapterId: chapterList.length+1,
      chapterName: item.title || '',
      imgPath: item.imgPath || undefined,
      chapterDes: item.content || '',
      chapterContent: item.content || '',
      publishTimer: new Date().getTime(),
      author: 'admin',
      views: 1,
    }
    chapterList.push(items);
  })
  res.write(JSON.stringify(chapterList));
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
  let user = '';
  let sign = 0;

  req.on('data', (data)=>{
      user += data;
  });

  req.on('end', ()=>{
    user = qs.parse(user.toString('utf8'));
      userList.map((item)=>{
          if(item.username == user.username && item.pwd == user.pwd){
              sign = 1;
              res.statusCode = 200;
              res.end('OK');
          }
      });
      if(sign == 0){
      res.statusCode = 404;
      res.end('error!')
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
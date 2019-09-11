#!/usr/bin/node

const EventEmiter = require('events').EventEmitter;

var e = new EventEmiter();
//global全局
setInterval(function(){
  e.emit('hello');
},1000);
global.setInterval(function(){
  e.emit('bye');
},5000);
e.on('hello',function(){
  console.log('Hello event emit');
});
e.on('bye',function(){
  console.log('goodBye!');
  process.exit();
})

#!/usr/bin/node

const EventEmitter = require('events').EventEmitter;
//构造函数第一个字母大写
function Dog(name, energy){
  var _name, _energy;
  var that = this;

  EventEmitter.call(this);//调用基类的构造函数

  _name = name;
  _energy = energy;

  var timer = setInterval(function(){
    if(_energy>0){
      that.emit('bark');
      _energy--;
    }else{
      clearInterval(timer);
    }
  },1000);

  this.getName = () => _name;
  this.getEnergy = ()  => _energy;
}
Dog.prototype = EventEmitter.prototype;
module.exports = Dog;

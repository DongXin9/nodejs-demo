#!/usr/bin/node

const EventEmitter = require('events').EventEmitter,
      util = require('util');
function Radio(station){
  var self = this;
  for(var m in EventEmitter.prototype){
    this[m] = EventEmitter.prototype[m];
  }
  setTimeout(()=>{
    self.emit('play',station);
  },0);
  setTimeout(()=>{
    self.emit('stop',station);
  },5000);
}
module.exports = Radio;

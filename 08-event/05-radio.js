#!/usr/bin/node

function Radio(station){
  var _listeners = {};
  //'play':[fn1,fn2,fn3];
  //'stop':[]
  //键值对
  setTimeout(()=>{
    emit('play',station);
  },0);
  setTimeout(()=>{
    emit('stop',station);
  },5000);

  function emit(evt, arg){
    if(typeof(_listeners[evt]) === 'undefind'){
      console.error('Error: %s not defined',evt);
      process.exit(1);
    }
    _listeners[evt].forEach((fn)=>{
      fn.call(this, arg);
    });
  }

  this.on = (evt, fn)=>{
    if(typeof _listeners[evt]==='undefined'){
      _listeners[evt]=[];
    }
    _listeners[evt].push(fn);
  };
}

module.exports = Radio;

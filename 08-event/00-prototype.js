#!/usr/bin/node

function A(){
  this.a1 = 10;
  this.a2 = 20;
  this.a3 = function(){
    cosnole.log('a1 = %d,a2 = %d',this.a1,this.a2);
  }
}


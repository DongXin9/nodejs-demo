#!/usr/bin/node
/*
const p = require('./02-export-var.js');
console.dir(module);
console.log(p);*/
/*const circle = require('./02-export-function.js');
console.log('r = 10, circle area: %d',circle(10).area());
console.log('r = 10, circle circumference:%d',circle(10).circumference());*/

/*
const circle = require('./02-export-object.js'),
      log = console.log;
log('r = 10,circle diameter:',circle.diameter(10));
log('r = 10,circle area:',circle.area(10));
console.dir(module);*/

const  area = require('./02-export-object-v2.js');
console.log('r = 10,cirle area:',area(10));



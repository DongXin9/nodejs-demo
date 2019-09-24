#!/usr/bin/node

module.exports = {
  pi: require('./02-export-var.js'),
  circle: require('./02-export-function.js'),
  Circle: require('./02-export-object.js')

};

console.dir(module);

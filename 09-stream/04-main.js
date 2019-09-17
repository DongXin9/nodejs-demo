#!/usr/bin/node

const GreenSteam = require('./04-green-stream.js'),
      stdin = process.stdin;
var g = new GreenSteam();
stdin.resume();
stdin.pipe(g);

#!/usr/bin/node
const Radio = require('./05-radio.js');
const log = console.log;
const station = {
  freq: '106.7',
  name: 'music Radio'
};
var radio = new Radio(station);
radio.on('play',(station) => {
  log('"%s" FM %s opened!',station.name,station.freq);
  log('lalala~');
});
radio.on('stop',(station) => {
  log('"%s" FM %s closed!',station.name,station.freq);
})

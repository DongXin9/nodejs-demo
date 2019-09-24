#!/usr/bin/node
const util = require('util');
const log = util.debuglog('foo');
//const logabc = util.debuglog('abc');
log('hello from foo [%d]', 123);

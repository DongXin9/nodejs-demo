#!/usr/bin/node
const fs = require('fs'),
      lnk = process.argv[3];
try{
    console.log(fs.statSync(lnk));

} catch(err) {
    console.error(err.message);
    process.exit(1);

}

const express = require('express')
      app = express();

app.get('/',function(req,res){
  res.end('Hello express');
})
app.listen(8080);

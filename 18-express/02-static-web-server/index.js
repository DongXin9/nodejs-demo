const express = require('express'),
      app = express();
//.表示当前目录
//use使用中间件
app.use(express.static('.'));
app.listen(8080);


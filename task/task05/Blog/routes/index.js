var express = require('express');
var router = express.Router();
var data = require('../data.json');
/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.post('/list',function(req,res,next){
  if(isLegal(req)) {
    res.render('list',{list:data.chapterList});
  } else {
    res.render('loginerror');
  }
})
function isLegal(req) {
  var isLegal = false;
  for(var i = 0; i < data.users.length; i++) {
    if(data.users[i].username === req.body.username && data.users[i].password === req.body.pwd) {
      isLegal = true;
      break;
    }
  }
  return isLegal;
}
module.exports = router;

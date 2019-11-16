var express = require('express');
var router = express.Router();

/* GET todo list listing. */
router.get('/', function(req, res, next) {
  res.send('todo list');
});

module.exports = router;

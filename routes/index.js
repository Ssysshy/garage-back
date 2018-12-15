var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.type('html');  // 渲染成html格式
  res.render('home');
});

module.exports = router;

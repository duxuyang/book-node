var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('卡刷积分卡手机疯狂拉升放大来看');
});

module.exports = router;

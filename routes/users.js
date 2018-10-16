var express = require('express');
const pool = require("../db");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('卡刷积分卡手机疯狂拉升放大来看');
});

router.post('/login', function(req, res) {
  let name = req.body.uname;
  let pass=req.body.upass;
  let sql= "select * from user where uname=? and upass=?";
	pool.query(sql,[name,pass],(err,result)=>{
		if(err)throw err;
		if(result.length){
			res.cookie('userinfo',result[0].uname,{expires: new Date(Date.now() + 900000),httpOnly:true,signed:true});
			res.json({code:1,id:result[0].id});//登录成功
		}else{
			res.json({code:0});//登录失败
		}
		
	})

});

router.post('/myinfo', function(req, res) {
 	 let id = req.body.id;
  let sql= "select * from user where id=?";
  pool.query(sql,[id],(err,result)=>{
		if(err)throw err;
		res.json(result);
  })
});

router.get('/regist', function(req, res) {
 res.send("2121212121") 
});



module.exports = router;

var express = require('express');
const pool = require("../db");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('在哪里');
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

<<<<<<< HEAD
router.post('/regist', function(req, res) {
 res.json({code:200});
=======


//书库
router.post('/collect', function(req, res) {
	let id = req.body.id;
	let sql=`select * from bookslist b,collect c where c.bid=b.id and c.uid=?`
	pool.query(sql,[id],(err,result)=>{
		if(err)throw err;
	  res.json(result);
	})

});




router.get('/regist', function(req, res) {
 res.send("2121212121") 
>>>>>>> 99e820e38360649b904554b3c97fac6374ae136a
});



module.exports = router;

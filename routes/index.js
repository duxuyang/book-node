var express = require('express');
const pool = require("../db");
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("来得快扩扩绿扩扩扩扩绿");
});




//热门小说
router.post('/hotbook', function(req, res, next) {
  var sql= "SELECT * FROM bookslist  ORDER BY  RAND() LIMIT 4";
	pool.query(sql,(err,result)=>{
			if(err)throw err;
			res.json(result);
	});		
});

//排行榜
router.post('/paihang', function(req, res, next) {
	var sql= "SELECT * FROM bookslist  ORDER BY  RAND() LIMIT 10";
	pool.query(sql,(err,result)=>{
			if(err)throw err;
			res.json(result);
	});
});

//免费读书
router.post('/freeread', function(req, res, next) {
	var sql= "SELECT * FROM bookslist  ORDER BY  RAND() LIMIT 4";
	pool.query(sql,(err,result)=>{
			if(err)throw err;
			res.json(result);
	});
});
//免费读书更多
router.post('/freemore', function(req, res, next) {
	var pno = req.query.pno;
	var pageSize = req.query.pageSize;
	if(!pno){ pno = 1;}
	if(!pageSize){pageSize=8};	
	var reg = /^[0-9]{1,}$/;
	if(!reg.test(pno)){
		res.json({code:-1,msg:"页码参数不正确!"});
		return;
	}
	if(!reg.test(pageSize)){
		res.json({code:-1,msg:"页大小参数不正确"});
		return;
	}
    var curPage = parseInt((pno-1)*pageSize);
    var ps = parseInt(pageSize);
	var sql= "SELECT * FROM bookslist LIMIT ?,?";
	pool.query(sql,[curPage,ps],(err,result)=>{
			if(err)throw err;
			res.json(result);
	});
});


//类型列表
router.post('/type', function(req, res, next) {
	var pno = req.body.pno;
	var pageSize = req.body.pageSize;
	var type=decodeURI(req.body.type);
	if(!pno){ pno = 1;}
	if(!pageSize){pageSize=8};		
	//2:验证表达式验证出错停止
	var reg = /^[0-9]{1,}$/;
	if(!reg.test(pno)){
		res.json({code:-1,msg:"页码参数不正确!"});
		return;
	}
	if(!reg.test(pageSize)){
		res.json({code:-1,msg:"页大小参数不正确"});
		return;
	}

	  var sql = "SELECT * FROM bookslist where type=? LIMIT ?,?";
    var curPage = parseInt((pno-1)*pageSize);
    var ps = parseInt(pageSize);
    pool.query(sql,[type,curPage,ps],(err,result)=>{
        if(err)throw err;
					res.json(result);
    });
});


//小说详情
router.post('/bookdetail', function(req, res, next) {
	var id = req.body.id;
  var sql= "select * from bookslist where id=?";
	pool.query(sql,[id],(err,result)=>{
			if(err)throw err;
			res.json(result);
	});
});

//每本书章节
router.post('/title', function(req, res, next) {
	var id = req.body.id;
  var sql= `select title from book${id}`;
	pool.query(sql,(err,result)=>{
			if(err)throw err;
			res.json(result);
	});
})
//每本书章节内容
router.post('/reader', function(req, res, next) {
	var id = req.body.id;
  var sql= `select * from book${id} where id=?`;
	pool.query(sql,[id],(err,result)=>{
			if(err)throw err;
			res.json(result);
	});
})


module.exports = router;

var express = require('express');
const pool = require("../db");
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
 
});


//热门小说
router.post('/hotbook', function(req, res, next) {
  var sql= "SELECT * FROM bookslist where id BETWEEN 30 and 33";
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
	var sql= "SELECT * FROM bookslist LIMIT 0,4";
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
	var curPage = parseInt((pno-1)*pageSize);
    var ps = parseInt(pageSize);
	if(type=="全部"){
	 var sql = "SELECT * FROM bookslist LIMIT ?,?";
	 pool.query(sql,[curPage,ps],(err,result)=>{
        if(err)throw err;
					res.json(result);
    });
	}else{
	  var sql = "SELECT * FROM bookslist where type=? LIMIT ?,?";
		pool.query(sql,[type,curPage,ps],(err,result)=>{
					if(err)throw err;
						res.json(result);
			});
	}
	  
    
    
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

//章节标题
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
	var number=req.body.number;
  var sql= `select name,title,content from book${id} where id=?`;
	pool.query(sql,[number],(err,result)=>{
		if(err)throw err;
		res.json(result);
	})
})

//搜索  模糊查询
router.post('/search', function(req, res, next) {
	var name = req.body.name;
  var sql= `select * from bookslist where name like '%${name}%'`;
	pool.query(sql,(err,result)=>{
		if(err)throw err;
		res.json(result);
	})
})
//热门搜索
router.post('/hotsearch', function(req, res, next) {
     var sql= "SELECT * FROM bookslist LIMIT 110,10";
	pool.query(sql,(err,result)=>{
		if(err)throw err;
		res.json(result);
	})
})

router.post('/ceshi', function(req, res, next) {
	console.log(req.headers.tokenid);
	res.json({state:200});
		
})


module.exports = router;

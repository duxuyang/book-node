var createError = require('http-errors');
var express = require('express');
var ejs = require('ejs'); 
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// 跨域设置
 app.all('*', function (req, res, next) {
   res.header("Access-Control-Allow-Credentials", true)
   res.header("Access-Control-Allow-Origin", "*")
   res.header("Access-Control-Allow-Headers", "X-Requested-With")
   res.header("Access-Control-Allow-Methods", "POST,GET,DELETE,OPTIONS,PUT")
   res.header("X-Powered-By", ' 3.2.1')
   res.header("Content-Type", "application/json;charset=utf-8")
   next()
 })


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('sign'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users/myinfo',function(req, res, next){
  console.log(req.signedCookies.userinfo)
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);

/*//判断登录有没有过时
app.use('/users/login',function(req, res, next){
  next()
})*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

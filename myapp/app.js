var history = require('connect-history-api-fallback'); // 引入history中间件,必须要在引入express前引入
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

//新代码，表示用monk访问mongodb,并且数据库的名字是hero
var monk = require('monk');
var db = monk('localhost:27017/mac');

// var indexRouter = require('./routes/index');    //生成时自带接口
// var usersRouter = require('./routes/users');    //生成时自带接口
var aside = require('./routes/aside');  //英雄列表
var login = require('./routes/login');  //登录
var table = require('./routes/table');  //查询表格
var app = express();

app.use(history({
  // htmlAcceptHeaders : [ ' te/xt / html ',' application / xhtml + xml ' ],
  // disableDotRule : true ,
  rewrites: [
    { from: /.*/g, to: '/'}
  ]
}));         // 在放在express.static前面
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 新增代码，解决跨域问题，方便访问本地数据库
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");     //设为星号，表示同意任意跨源请求,单独设置域名，可设为'www.baidu.com'
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  if(req.method == "OPTIONS") {        //跨域请求会发两次，第一次方式是OPTIONS，询问服务器是否允许跨域，第二次才是正式请求
    res.send("200");     //允许第一次OPTIONS预检请求
  } else {
    next();
  }
});

// 修改原始代码
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.get('/', aside.list(db));         //获得所有的列表
app.get('/aside', aside.list(db));     //获得所有的列表
app.use('/login', login.check(db));     // 登录接口
app.get('/table', table.list(db));      // 表格的接口



// app.get("/", function(req, res) {
//   console.log('heihei');
//   res.sendFile(path.join(__dirname, "../dist/index.html"))

// })

// 新增代码，配合vue-router的history模式，配置后台接口，防止404
// 原生nodejs版
// const http = require('http')
// const fs = require('fs')
// const httpPort = 80

// http.createServer((req, res) => {
//   fs.readFile('index.htm', 'utf-8', (err, content) => {
//     if (err) {
//       console.log('We cannot open "index.htm" file.')
//     }

//     res.writeHead(200, {
//       'Content-Type': 'text/html; charset=utf-8'
//     })

//     res.end(content)
//   })
// }).listen(httpPort, () => {
//   console.log('Server listening on: http://localhost:%s', httpPort)
// })

// express版


module.exports = app;


// It looks like you are trying to access MongoDB over HTTP on the native driver port.

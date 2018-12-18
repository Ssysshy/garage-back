const express = require('express');
const createError = require('http-errors');
const path = require('path');

// 日志记录
const logger = require('morgan');
const fs = require('fs');
const FileStreamRotator = require('file-stream-rotator');

// cookie储存
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');
const news = require('./routes/news');
const cate = require('./routes/cate');
const comment = require('./routes/comment');
const upload = require('./routes/upload');
const product = require('./routes/product');
const occupy = require('./routes/occupy');
const disk = require('./routes/disk');

import './plugin/mongodbClient';
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'uploads')));

// logger path set
const logDirectory = __dirname + '/logs';
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
// create a rotating write stream
const accessLogStream = FileStreamRotator.getStream({
  filename: logDirectory + '/access-%DATE%.log',
  frequency: 'daily',
  verbose: false
});
// setup the logger
app.use(logger('combined', {stream: accessLogStream}));


app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/news', news);
app.use('/cate', cate);
app.use('/comment', comment);
app.use('/upload', upload);
app.use('/product', product);
app.use('/occupy', occupy);
app.use('/disk', disk);

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

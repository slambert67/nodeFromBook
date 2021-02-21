/**
 * To use app:
 * terminal 1 : npm run startrest : "cross-env DEBUG=fibonacci:* SERVERPORT=3002 node ./fiboserver"
 * 
 * 
 * terminal 2 : npm run server    : "cross-env DEBUG=fibonacci:* SERVERPORT=3002 node  ./bin/www"
 * - runs this app
 * - uses fibonacciRouter : ./routes/fibonacci-rest'
 * - /fibonacci -> fibonacciRouter
 * - - creates http request to call fiboserver above
 */
var createError = require('http-errors');
var express = require('express');
const hbs = require('hbs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//const fibonacciRouter = require('./routes/fibonacci');
const fibonacciRouter = require('./routes/fibonacci-rest');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/fibonacci', fibonacciRouter);

// catch 404 and forward to error handler
// middleware raising error will have called next() with 1st parameter being the error
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// error handler signatures have error as 1st parameter
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

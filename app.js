var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('secret app'));
app.use(session({
  secret: 'secret app',
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));



app.use(function(req, res, next){
  if(req.session.data == undefined){
    var fs = require('fs');
    var data = JSON.parse(fs.readFileSync('./data.json', "utf-8"));
    req.session.data = data;
  }
  next();
});

app.use('/', routes);

module.exports = app;

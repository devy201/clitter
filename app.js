
/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');
var connect = require('connect');
var mongoStore = require('connect-mongodb');
var routes = require('./routes');
var user = require('./routes/user');
var login = require('./routes/login');
var signup = require('./routes/signup');
var http = require('http');
var path = require('path');



var app = express();

app.configure(function(){
  app.set('ipaddress', process.env.OPENSHIFT_INTERNAL_IP || "127.0.0.1");
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.cookieParser());
  app.use(express.session({store: mongoStore('mongodb://devy:DvY02061989@linus.mongohq.com:10013/devy_devy201'), secret: 'topsecret'}));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});




app.get('/', routes.index);
app.post('/', login.login);
app.get('/users', user.list);
app.get('/login', login.loginPageShow);
app.post('/login', login.login);
app.get('/signup', signup.signup);
app.post('/signup', signup.saveUser);

http.createServer(app).listen(app.get('port'), app.get('ipaddress'), function(){
  console.log("Express server listening on port " + app.get('port')+" ip adress "+app.get('ipaddress'));
});



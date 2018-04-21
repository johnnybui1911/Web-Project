var express = require('express');
var staffController = require('./controllers/staffController');
var studentController = require('./controllers/studentController');
var loginController = require('./controllers/loginController');
var session = require('express-session');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static file lile css, jquery, or png
app.use(express.static('./public'));
app.use(session({secret: "Shh, its a secret!"}));


//homepage
app.get('/index', function(req, res){
  req.session.logginCheck1 = false;
  req.session.logginCheck2 = false;
  res.render('index');
});

app.get('/', function(req, res){

  res.render('index');
});

app.get('/loginStaff', function(req, res){

  res.render('loginStaff');
});

app.get('/loginStudent', function(req, res){
  res.render('loginStudent');
});



//---------------------------------------------------------------------


//file controllers
loginController(app);
staffController(app);
studentController(app);


//listen to port
app.listen(3000);
console.log('You are listening to port 3000');

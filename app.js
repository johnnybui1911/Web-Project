var compression = require('compression');
var express = require('express');
var staffController = require('./controllers/staffController');
var studentController = require('./controllers/studentController');
var loginController = require('./controllers/loginController');
var session = require('express-session');
var mongoose = require('mongoose');
var staff = require('./controllers/staff');

mongoose.connect('mongodb://test:test@ds227119.mlab.com:27119/csit214events');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static file lile css, jquery, or png
app.use(compression());
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


app.use("/", staff);
//---------------------------------------------------------------------


//file controllers
loginController(app);
staffController(app);
studentController(app);


//listen to port
app.listen(process.env.PORT || 3000);
// app.listen(3000);

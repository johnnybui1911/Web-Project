var compression = require('compression');
var express = require('express');
var staffController = require('./controllers/staffController');
var studentController = require('./controllers/studentController');
var loginController = require('./controllers/loginController');
var session = require('express-session');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var staff = require('./controllers/staff');
var Todo = require('./controllers/serverController');
var Booking = require('./controllers/serverController2');
var User = require('./controllers/userSchema');

var urlencodedParser = bodyParser.urlencoded({ extended: false });


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
  req.session.logginType = "student";
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

app.get('/createAccount', function(req, res){
    res.render('createAccount');
});


app.post('/createAccount', urlencodedParser, function(req, res){
  //get data from the view and add it to mongodb
  var user = req.body.username;
  User.findOne({username: req.body.username}, function (err, data){
    if (err) throw err;
    //console.log(data.array);
    if(!data)
    {
      if(req.body.password=="error")
      {
        res.json("incorrect");
      }
      else {
        var newTodo = User(req.body).save(function(err, data){
          if (err) throw err;
          res.json("done");
        });
      }

    }
    else {
      res.json("error");
    }
  });


});

app.get('/viewAccount', function(req, res){
  //get data from mongodb and pass it to view
  var user = req.session.user;
  //console.log(req.session.user);
  User.findOne({username: user}, function (err, data){
    if (err) throw err;
    //console.log(data.array);
    res.render('viewAccount', {details: data, user: req.session.user});
  });

});

app.get('/viewHistory', function(req, res){
  //get data from mongodb and pass it to view
  var user = req.session.user;
  //console.log(req.session.user);
  User.findOne({username: req.session.user}, function (err, data){
    if (err) throw err;
    //console.log(data.array);
    res.render('viewHistory', {activities: data.history, user: req.session.user, details: data});
  });

});


app.get('/updateAccount/:user', function(req, res){
  //get data from mongodb and pass it to view
  var user = req.session.user;

  //console.log(req.session.user);
  User.findOne({username: user}, function (err, data){
    if (err) throw err;
    //console.log(data.array);
    res.render('updateAccount', {details: data, user: req.session.user});
  });

});

app.post('/updateAccount/:user', urlencodedParser, function(req, res){
  var user = req.params.user;

  User.findOne({username: req.params.user}, function (err, foundObject){
    if (err) throw err;

    // foundObject.fullName = req.body.fullNameA;
    foundObject.phoneNumber = req.body.phoneNumberA;
    foundObject.email = req.body.emailAccountA;
    // foundObject.studentNumber = req.body.studentNumberA;

    foundObject.save(function(err, updatedObject){
      if (err) throw err;
      res.redirect('/viewAccount');
    });

  });

});


app.get('/changePassAccount/:user', function(req, res){
  //get data from mongodb and pass it to view
  var user = req.session.user;

  //console.log(req.session.user);
  User.findOne({username: req.session.user}, function (err, data){
    if (err) throw err;
    //console.log(data.array);
    res.render('changePassAccount', {details: data, user: req.session.user});
  });

});

app.post('/changePassAccount/:user', urlencodedParser, function(req, res){
  var user = req.params.user;

  User.findOne({username: user}, function (err, foundObject){
    if (err) throw err;

    if(foundObject.password!=req.body.oldPass)
    {

      res.send("Error");

    }
    else {
      if(req.body.newPass!=req.body.newPass2)
      {
        res.send("Not");
      }
      else
      {
        foundObject.password = req.body.newPass;
        foundObject.save(function(err, updatedObject){
          if (err) throw err;
          res.send("Done");
        });
      }

    }





  });

});

//file controllers
loginController(app);
staffController(app);
studentController(app);


//listen to port
app.listen(process.env.PORT || 3000);
// app.listen(3000);

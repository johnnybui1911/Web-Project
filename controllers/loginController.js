var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./userSchema');
//Connect to database

/*var itemOne = User({username: "bhv111", password: "123456", type: "staff", array: []})
.save(function(err){

  if (err) throw err;
  console.log("item saved");

});*/

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var urlencodedParser2 = bodyParser.urlencoded({ extended: false });
module.exports = function(app){
  ///////////////////////////
    app.post('/loginStaff', urlencodedParser, function(req, res){
      //console.log(req.body);
      var type = "staff";
      req.session.user = "";
      //console.log(req.body.username);
      User.findOne({username: req.body.username}, function(err, foundObject){

        if (err) throw err;
        //console.log(foundObject.name);
        if(!foundObject)
        {
          res.json();
        }
        else {
          if(req.body.password!=foundObject.password)
          {
            res.json();
          }
          else {
            if(type!=foundObject.type)
            {
              res.json();
            }
            else {
              req.session.user = req.body.username;
              req.session.logginCheck1 = true;
              res.json(foundObject);
            }
          }
        }


        //res.render('adjustEvent', {todos: foundObject});
      });
    });

    app.post('/loginStudent', urlencodedParser2, function(req, res){

      //console.log(req.body);
      var type = "student";
      req.session.user = "";
      //console.log(req.body.username);
      User.findOne({username: req.body.username}, function(err, foundObject){


        if (err) throw err;

        if(!foundObject)
        {

          res.json();
        }
        else {
          if(req.body.password!=foundObject.password)
          {
            res.json();
          }
          else {
            if(type!=foundObject.type)
            {
              console.log(foundObject.type);
              res.json();
            }
            else {
              req.session.user = req.body.username;
              req.session.logginCheck2 = true;
              res.json(foundObject);
            }
          }
        }


        //res.render('adjustEvent', {todos: foundObject});
      });
    });
  ////////////////////////////
};

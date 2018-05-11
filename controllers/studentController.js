var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Todo = require('./serverController');
var Booking = require('./serverController2');
var User = require('./userSchema');


var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

  //staffPage
  app.get('/student', function(req, res){
    //console.log(req.session.user);
    //console.log(req.session.user);
    if(req.session.logginCheck2)
    {
      res.render('student', {user: req.session.user});
    }
    else {
      res.render('index');
    }


  });

  app.get('/paymentBooking', function(req, res){
    //get data from mongodb and pass it to view
      if(req.session.logginCheck2)
      {
        res.render('paymentBooking');
      }
      else {
        res.render('index');
      }

  });

  var number = 0;
  app.get('/paymentBooking/:num', function(req, res){
    //get data from mongodb and pass it to view
      number = req.params.num;

      if(req.session.logginCheck2)
      {
        Todo.findOne({num: number}, function(err, foundObject){
          res.render('paymentBooking', {number: number, user: req.session.user, todos: foundObject});
        });
      }
      else {
        res.render('index');
      }

  });

  app.get('/paymentBooking/:check/:num', function(req, res){
    //get data from mongodb and pass it to view
    if(req.session.logginCheck2)
    {
      Todo.findOne({num: number}, function(err, foundObject){
          if(foundObject.code == req.params.check)
          {
            console.log('123');
            res.json(foundObject);
          }
          else {
            res.json();
          }
      });
    }
    else {
      res.render('index');
    }

  });

  app.post('/paymentBooking/:num', urlencodedParser, function(req, res){
    var user = req.session.user;
    Todo.findOne({num: number}, function(err, foundObject){

      if(err) throw err;
        User.findOne({username: user}, function (err, found)
        {

          if (err) throw err;
            foundObject.booked = foundObject.booked +1;
            foundObject.max = foundObject.max -1;
            found.array.push(foundObject);
            //console.log(found.array);


            foundObject.save(function(err, update){
              if(err) throw err;
            });

            var date = new Date();
            found.history.push({action: "Book Event " +foundObject.name, time: date});

            found.save(function(err, update){
              if(err) throw err;
              res.redirect('/viewBooking');
            });


        });


    });

  });


  //viewEvent2
  app.get('/viewEventStudent', function(req, res){
    //get data from mongodb and pass it to view
    if(req.session.logginCheck2)
    {
      Todo.find({}).sort('-date').exec( function(err, data){
        if (err) throw err;
        var arrayCheck = data;
        var u = req.session.user;
        User.findOne({username: u}, function (err, found){

          for(var i=0; i<found.array.length; i++)
          {

            for(var j=0; j<data.length; j++)
            {

              if(found.array[i].num == data[j].num)
              {

                var obj = data[j].toObject();
                obj.check = true;
                arrayCheck[j] = obj;
                break;
              }
            }
          }

          var array2=[];
          var d = new Date();
          for(var i=0; i<arrayCheck.length; i++)
          {
            if(arrayCheck[i].date>=d)
            {
              array2.push(arrayCheck[i]);
            }
          }

          res.render('viewEventStudent', {todos: array2, user: req.session.user});
        });
      });
    }
    else {
      res.render('index');
    }

  });


  app.get('/viewEventStudent/:num', function(req, res){
    //find data from mongodb and put new data in that via view
    var num = req.params.num;
    //console.log(num);
    var user = req.session.user;
    //console.log(req.session.user);
    Todo.findOne({num: num}, function(err, foundObject){

      if(err) throw err;
      if(foundObject.max == 0)
      {
        res.json("capacity");
      }
      else {
        User.findOne({username: user}, function (err, found)
        {
          var check = true;
          if (err) throw err;
          for(var i=0; i<found.array.length; i++)
          {
            if(found.array[i].num == num)
            {
              check = false;
            }
          }

          if(!check)
          {
            //console.log("errpr");
            res.json("booked");
          }
          else {
            if(foundObject.price != 0)
            {
              //console.log('payment');
              res.json("payment");
            }
            else {
              foundObject.booked = foundObject.booked +1;
              foundObject.max = foundObject.max -1;
              found.array.push(foundObject);
              foundObject.save(function(err, update){
                if(err) throw err;
              });

              //console.log(found.array);
              var date = new Date();
              found.history.push({action: "Book Event " +foundObject.name, time: date});

              found.save(function(err, update){
                if(err) throw err;
                res.json("book");
              });
            }

          }

        });
      }




    });
  });

  /*Booking.findOne({num: num}, function(err, found){
    if(found)
    {
      res.json();
    }
    else
    {
      var newBooking = Booking({num: num, name: foundObject.name, des: foundObject.des,
                          start: foundObject.start, end: foundObject.end, max: foundObject.max, price: foundObject.price,
                           address: foundObject.address, code: foundObject.code}).save(function(err, data){
                             if (err) throw err;
                             res.json(foundObject);*/

  //adjustEvent
  app.get('/viewBooking', function(req, res){
    if(req.session.logginCheck2)
    {
      var user = req.session.user;
      //console.log(req.session.user);
      User.findOne({username: user}, function (err, data){
        if (err) throw err;
        //console.log(data.array);
        var array = data.array;
        array.sort(function(a,b){
        return b.date - a.date;
        });

        res.render('viewBooking', {todos: array, user: req.session.user});
      });
    }
    else {
      res.render('index');
    }


  });


  app.delete('/viewBooking/:n', function(req, res){
    //console.log(req.params);
    var user = req.session.user;
    //console.log(req.session.user);
    User.findOne({username: user}, function (err, data){
      if(err) throw err;
      var x = 0;
      //console.log(data.array);
      // console.log(data);
      var length = data.array.length;
      for(var i =0; i<length; i++)
      {
        if(data.array[i].num == req.params.n)
        {
          x = i;
          break;
        }
      }

      data.array.splice(x, 1);

      var name;
      Todo.findOne({num: req.params.n}, function(err, foundObject){
        name = foundObject.name;
        console.log(name);
        foundObject.booked = foundObject.booked -1;
        foundObject.max = foundObject.max +1;
        foundObject.save(function(err, update){
          if(err) throw err;
        });

        var date = new Date();
        data.history.push({action: "Cancel Booking " + name, time: date});
        //console.log(data.array);
        data.save(function(err, update){
          if(err) throw err;
          res.json(update);
        });
      });





    });
  });

  app.delete('/viewEventStudent/:n', function(req, res){
    //console.log(req.params);
    var user = req.session.user;
    //console.log(req.session.user);
    User.findOne({username: user}, function (err, data){
      if(err) throw err;
      var x = 0;
      //console.log(data.array);
      var length = data.array.length;
      for(var i =0; i<length; i++)
      {
        if(data.array[i].num == req.params.n)
        {
          x = i;
          break;
        }
      }

      data.array.splice(x, 1);

      var name;
      Todo.findOne({num: req.params.n}, function(err, foundObject){
        foundObject.booked = foundObject.booked -1;
        foundObject.max = foundObject.max +1;
        name = foundObject.name;
        foundObject.save(function(err, update){
          if(err) throw err;
        });

        var date = new Date();
        data.history.push({action: "Cancel Booking " + name, time: date});
        data.save(function(err, update){
          if(err) throw err;
          res.json(update);
        });
      });



      //console.log(data.array);


    });
  });

};

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Todo = require('./serverController');
var Booking = require('./serverController2');
var User = require('./userSchema');

//Connect to database
/*mongoose.connect('mongodb://test:test@ds227119.mlab.com:27119/csit214events');


//Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  num: Number,
  name: String,
  des: String,
  start: String,
  end: String,
  max: String,
  price: String,
  address: String,
  code: String
});

var Todo = mongoose.model('Todo', todoSchema);*/
/*var itemOne = Todo({name: "IT Meeting", des: "Meeting with IT Developer",
                    start: "03/05/18", end: "04/05/18", max: "50", price: "$20",
                     address: "Bld67", code: "#ITforever"}).save(function(err){
  if (err) throw err;
  console.log("item saved");
});*/


var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){


  //---------------------------------------------------------------------

  //createEvent
  app.get('/createEvent', function(req, res){

    if(req.session.logginCheck1)
    {
      res.render('createEvent', {user: req.session.user});
    }
    else {
      res.render('index');
    }


  });



  var x;
  Todo.findOne({}).sort('-num').exec( function(err, doc) {
    if(!doc)
    {
      x = 1;
    }
    else {
      x = doc.num + 1;

    }

  });

  app.post('/createEvent', urlencodedParser, function(req, res){
    //get data from the view and add it to mongodb
    req.body.num = x;
    //console.log(req.body);
    req.body.creator = req.session.user;

    var user = req.session.user;
    User.findOne({username: user}, function(err, foundObject){
      if(err) throw err;
      var date = new Date();
      foundObject.history.push({action: "Create Event " +req.body.name, time: date});
      foundObject.save(function(err, saveObject){
        if(err) throw err;
      });
    });

    var newTodo = Todo(req.body).save(function(err, data){
      if (err) throw err;
      res.json(data);
    });
    x++;
  });



//---------------------------------------------------------------------
  //viewEvent
  app.get('/viewEvent', function(req, res){
    //get data from mongodb and pass it to view
    if(req.session.logginCheck1)
    {

      Todo.find({}).sort('-date').exec( function(err, dataFound){
        if (err) throw err;
        var dataNew = dataFound;
        var u = req.session.user;
        User.findOne({username: u}, function (err, found){

          for(var i=0; i<found.array.length; i++)
          {

            for(var j=0; j<dataFound.length; j++)
            {

              if(found.array[i].num == dataFound[j].num)
              {

                var obj = dataFound[j].toObject();
                obj.check = true;
                dataNew[j] = obj;
                break;
              }
            }
          }

          var data = dataNew;
          var da = new Date();
          var dd = da.getDate();
          var mm = da.getMonth();
          var yy = 1900+da.getYear();


          var d = new Date(yy, mm, dd);


          for(var i=0; i<dataNew.length; i++)
          {
            if(dataNew[i].date<d)
            {
              data[i].past = true;
            }
          }


          if(req.query.showE=="all")
          {
            // var dataNew = data;
            //
            // var array=[];
            // var da = new Date();
            // var dd = da.getDate();
            // var mm = da.getMonth();
            // var yy = 1900+da.getYear();
            //
            //
            // var d = new Date(yy, mm, dd);
            //
            //
            // for(var i=0; i<data.length; i++)
            // {
            //   if(data[i].date<d)
            //   {
            //     var obj = data[i].toObject();
            //     obj.past = true;
            //     dataNew[i] = obj;
            //   }
            // }
            res.render('viewEvent', {todos: data, user: req.session.user, selectVal: req.query.showE});
          }
          else if(req.query.showE=="upcomming") {

            var array=[];
            var da = new Date();
            var dd = da.getDate();
            var mm = da.getMonth();
            var yy = 1900+da.getYear();

            var d = new Date(yy, mm, dd);

            for(var i=0; i<data.length; i++)
            {
              if(data[i].date>=d)
              {
                array.push(data[i]);
              }
            }
            res.render('viewEvent', {todos: array, user: req.session.user, selectVal: req.query.showE});
          }
          else if(req.query.showE=="past") {

            var array=[];
            var da = new Date();
            var dd = da.getDate();
            var mm = da.getMonth();
            var yy = 1900+da.getYear();


            var d = new Date(yy, mm, dd);


            for(var i=0; i<data.length; i++)
            {
              if(data[i].date<d)
              {
                array.push(data[i]);
              }
            }
            res.render('viewEvent', {todos: array, user: req.session.user, selectVal: req.query.showE});
          }
          else {
            res.render('viewEvent', {todos: data, user: req.session.user, selectVal: "all"});
          }
        });




      });

    }
    else {
      res.render('index');
    }



  });

  app.get('/viewEvent/:num', function(req, res){
    //find data from mongodb and put new data in that via view
    var num = req.params.num;
    //console.log(num);
    Todo.findOne({num: num}, function(err, foundObject){

      if (err) throw err;
      if(foundObject.creator != req.session.user)
      {
        res.json();
      }
      else {
        res.json(foundObject);
      }//console.log(foundObject.name);


      //res.render('adjustEvent', {todos: foundObject});
    });

  });

  app.get('/viewEvent/booking/:num', function(req, res){
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

  app.delete('/viewEvent/booking/:n', function(req, res){
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


      Todo.findOne({num: req.params.n}, function(err, foundObject){
        var name;
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




//---------------------------------------------------------------------
  //adjustEvent
  app.get('/adjustEvent', function(req, res){

    res.render('adjustEvent');
  });


  var num = 0
  app.get('/adjustEvent/:num', function(req, res){
    num = req.params.num;

    if(req.session.logginCheck1)
    {
      //console.log(num);
      Todo.findOne({num: num}, function(err, foundObject){

        if (err) throw err;
        //console.log(foundObject.name);
        res.render('adjustEvent', {todos: foundObject, user: req.session.user});

      });
    }
    else {
      res.render('index');
    }



  });

  app.delete('/viewEvent/:n', function(req, res){
    //console.log(req.params);

    var n = req.params.n;

    Todo.findOne({num: n}, function(err, foundObject){

      if(err) throw err;

      if(foundObject.creator != req.session.user)
      {
        res.json();
      }
      else {
        var name = foundObject.name;
        Todo.find({num: n}).remove(function(err, data){
          if(err) throw err;

          User.find({}, function(err, found){
            if(err) throw err;

            for(var i=0; i<found.length; i++)
            {
              var key = -1;
              for(var j=0; j<found[i].array.length; j++)
              {
                if(found[i].array[j].num==n)
                {
                  key = j;
                  break;
                }

              }

              if(key != -1)
              {
                found[i].array.splice(key, 1);

                found[i].save(function(err, update){
                  if(err) throw err;
                });
              }
            }
          });

          var user = req.session.user;
          User.findOne({username: user}, function(err, foundObject){
            if(err) throw err;
            var date = new Date();
            foundObject.history.push({action: "Delete Event " +name, time: date});
            foundObject.save(function(err, saveObject){
              if(err) throw err;
            });
          });

          res.json(data);
        });
      }
    });



  });


  app.post('/adjustEvent/:num', urlencodedParser, function(req, res){


    Todo.findOne({num: num}, function(err, foundObject){
      if (err) throw err;
      var event;
      event = foundObject.name;


      foundObject.name = req.body.nameA;
      foundObject.des = req.body.desA;
      foundObject.date = req.body.dateA;
      foundObject.start = req.body.startA;
      foundObject.end = req.body.endA;
      foundObject.max = req.body.maxA;
      foundObject.price = req.body.priceA;
      foundObject.address = req.body.addressA;
      foundObject.code = req.body.codeA;
      foundObject.percent = req.body.percentA;


      User.find({}, function(err, found){
        if(err) throw err;
        for(var i=0; i<found.length; i++)
        {
          var key = -1;
          for(var j=0; j<found[i].array.length; j++)
          {
            if(found[i].array[j].num==num)
            {
              key = j;
              break;
            }
          }

          if(key != -1)
          {
            found[i].array[key].name = req.body.nameA;
            found[i].array[key].des = req.body.desA;
            found[i].array[key].date = req.body.dateA;
            found[i].array[key].start = req.body.startA;
            found[i].array[key].end = req.body.endA;
            found[i].array[key].max = req.body.maxA;
            found[i].array[key].price = req.body.priceA;
            found[i].array[key].address = req.body.addressA;
            found[i].array[key].code = req.body.codeA;
            found[i].array[key].percent = req.body.percentA;

            found[i].save(function(err, update){
              if(err) throw err;
            });
            //console.log("Booking has changed");
          }
        }

      });


      var user = req.session.user;

      User.findOne({username: user}, function(err, userFound){
        if(err) throw err;
        var date = new Date();
        userFound.history.push({action: "Update Event "+event, time: date});

        userFound.save(function(err, saveObject){
          if(err) throw err;
        });
      });

      //console.log(foundObject);
      foundObject.save(function(err, updatedObject){
        if (err) throw err;
        res.redirect('/viewEvent');
      });

    });

  });




//---------------------------------------------------------------------
};

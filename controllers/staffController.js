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

  //staffPage
  app.get('/staff', function(req, res){
    if(req.session.logginCheck1)
    {
      res.render('staff', {user: req.session.user});
    }
    else {
      res.render('index');
    }

  });


  //---------------------------------------------------------------------

  //createEvent
  app.get('/createEvent', function(req, res){

    res.render('createEvent', {user: req.session.user});

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
    /*if(req.session.logginCheck1)
    {



    }
    else {
      res.render('index');
    }*/


    Todo.find({}).sort('-date').exec( function(err, data){
      if (err) throw err;


      if(req.query.showE=="all")
      {
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
        res.render('viewEvent', {todos: data, user: req.session.user, selectVal: req.query.showE});
      }

    });
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



//---------------------------------------------------------------------
  //selectEvent
  /*app.get('/selectEvent', function(req, res){

    Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('selectEvent', {todos: data});
    });
  });

  app.delete('/selectEvent/:num', function(req, res){
    //console.log(req.params);
    Booking.find({num: req.params.num}).remove(function(err, data){
      if(err) throw err;
      console.log('Booking has deleted');
    });

    Todo.find({num: req.params.num.replace(/\-/g, " ")}).remove(function(err, data){
      if(err) throw err;
      res.json(data);
    });
  });*/

//---------------------------------------------------------------------
  //adjustEvent
  app.get('/adjustEvent', function(req, res){

    res.render('adjustEvent');
  });


  var num = 0
  app.get('/adjustEvent/:num', function(req, res){

    num = req.params.num;
    //console.log(num);
    Todo.findOne({num: num}, function(err, foundObject){

      if (err) throw err;
      //console.log(foundObject.name);
      res.render('adjustEvent', {todos: foundObject, user: req.session.user});

    });
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

          res.json(data);
        });
      }
    });



  });


  app.post('/adjustEvent/:num', urlencodedParser, function(req, res){

    Todo.findOne({num: num}, function(err, foundObject){
      if (err) throw err;

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


      //console.log(foundObject);
      foundObject.save(function(err, updatedObject){
        if (err) throw err;
        res.redirect('/viewEvent');
      });

    });

  });




//---------------------------------------------------------------------
};

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets')); //using middleware, to use external css
// first parameter is request, second is forder include file css


app.get('/', function(req, res){
  res.render('index'); //set to use render
});

app.get('/contact', function(req, res){ //keep get and then post
  res.render('contact', {qs: req.query});
});

app.post('/contact', urlencodedParser, function(req, res){
  console.log(req.body);
  res.render('contact-success', {data: req.body});
});

app.get('/profile/:name/', function(req, res){
  var data = {age: 29, job: 'ninja', hobbies: ['fighting', 'fishing', 'eating']};
  res.render('profile', {person: req.params.name, data: data});
});

app.listen(3000);

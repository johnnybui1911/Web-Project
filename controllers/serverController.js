var mongoose = require('mongoose');


var todoSchema = require('./todoSchema');


//Create a schema - this is like a blueprint
/*var todoSchema = new mongoose.Schema({
  num: Number,
  name: String,
  des: String,
  start: String,
  end: String,
  max: String,
  price: String,
  address: String,
  code: String
});*/

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;

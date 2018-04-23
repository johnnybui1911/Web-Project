var mongoose = require('mongoose');





//Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  num: Number,
  name: String,
  des: String,
  date: Date,
  start: String,
  end: String,
  max: Number,
  price: Number,
  address: String,
  code: String,
  percent: Number,
  creator: String,
  booked: Number
});

module.exports = todoSchema;

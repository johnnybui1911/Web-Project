var mongoose = require('mongoose');


mongoose.connect('mongodb://test:test@ds227119.mlab.com:27119/csit214events');


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

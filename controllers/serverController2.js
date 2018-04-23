var mongoose = require('mongoose');




//Create a schema - this is like a blueprint
var bookSchema = new mongoose.Schema({
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

var Booking = mongoose.model('Booking', bookSchema);

module.exports = Booking;

var mongoose = require('mongoose');


var todoSchema = require('./todoSchema');
//Create a schema - this is like a blueprint
var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  type: String,
  array: [todoSchema],
  fullName: String,
  phoneNumber: String,
  email: String,
  studentNumber: String,
  history: [{action: String, time: Date}]
});

var User = mongoose.model('User', userSchema);
/*var itemOne = User({username: "bbb111", password: "123456",
                    type: "student", array: []}).save(function(err){
  if (err) throw err;
  console.log("item saved");
});*/
module.exports = User;

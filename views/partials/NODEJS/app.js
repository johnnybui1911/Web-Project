//normal function statement
/*function sayHi(){
  console.log('hey ninjas');
}

sayHi();

//function EXPRESSION
var sayBye = function(){
  console.log('bye');
}

sayBye();

function callFunction(fun){
  fun();
}

callFunction(sayBye);*/

/*var counter = require('./count');

console.log(counter(['hello', 'hi']));*/

var events = require('events');
var util = require('util');

var Person = function(name){ //object constructor
  this.name = name;
};

util.inherits(Person, events.EventEmitter);

var james = new Person('james');
var mary = new Person('mary');
var ryu = new Person('ryu');
var people = [james, mary, ryu];

people.forEach(function(person) //person equal to each value in array, like james
{
  person.on('speak', function(mssg)
  {
    console.log(person.name + ' said ' + mssg);
  });
});

james.emit('speak', 'hey dudes');
mary.emit('speak', 'I want a curry');

/*var myEmitter = new events.EventEmitter();

myEmitter.on('someEvent', function(mssg){
  console.log(mssg);
});

myEmitter.emit('someEvent', 'Anh yeu em');*/

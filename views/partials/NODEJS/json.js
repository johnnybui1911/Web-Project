var http = require('http'); //create server http
var fs = require('fs');




var server = http.createServer(function(req, res){
  console.log('request was made: ' + req.url); //show url of request
  res.writeHead(200, {'Content-Type': 'application/json'}); //respone header //status=200, Type = text/html
  var myObj = {
    name: 'Ryu',
    job: 'Ninja',
    age: 29
  };
  res.end(JSON.stringify(myObj));
  //res.end('Hey ninjas'); //send back to browser
});

server.listen(3000, '127.0.0.1'); //local //request send to server, and server is listening
console.log('now listening to port 3000');

var http = require('http'); //create server http
var fs = require('fs');




var server = http.createServer(function(req, res){
//  console.log('request was made: ' + req.url); //show url of request
  if(req.url === '/home' || req.url === '/'){
    res.writeHead(200, {'Content-Type': 'text/html'}); //respone header //status=200, Type = text/html
    fs.createReadStream(__dirname + '/index.html').pipe(res); //read stream from file html
    //var myWriteStream = fs.createWriteStream(__dirname + '/writeMe.txt');

    //myReadStream.pipe(res); //pass buffer to res, then res send it to browser
  }
  else if(req.url === '/contact-us'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream(__dirname + '/contact.html').pipe(res);
  }
  else if(req.url === '/api/ninjas'){
    res.writeHead(200, {'Content-Type': 'application/json'}); //respone header //status=200, Type = text/html
    var myObj = {
      name: 'Ryu',
      job: 'Ninja',
      age: 29
    };
    res.end(JSON.stringify(myObj));
  }
  else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream(__dirname + '/404.html').pipe(res);
  }


  //res.end('Hey ninjas'); //send back to browser
});

server.listen(3000, '127.0.0.1'); //local //request send to server, and server is listening
console.log('now listening to port 3000');


/*myReadStream.on('data', function(chunk){ //event
  console.log('new chunk received:');
  //console.log(chunk);
  myWriteStream.write(chunk);
});*/

var fs = require('fs');

//var readMe = fs.readFileSync('readMe.txt', 'utf8'); //ver1
//console.log(readMe);

/*fs.readFile('readMe.txt', 'utf8', function(err, data) //ver2 //asynchronous = adaptive, need finish that and then do the other
// not like synchronous = happend at the same time
{
  fs.writeFile('writeMe.txt', data);
});*/

//fs.writeFileSync('writeMe.txt', readMe); //filename, string

//console.log('test');

//code

//fs.unlink('writeMe.txt'); //delete

//fs.mkdirSync('stuff'); //create
//fs.rmdirSync('stuff'); //delete

/*fs.mkdir('stuff', function(){
  fs.readFile('readMe.txt', 'utf8', function(err, data){
    fs.writeFile('./stuff/writeMe.txt', data);
  })
});*/

fs.unlink('./stuff/writeMe.txt', function(){
  fs.rmdir('stuff');
});

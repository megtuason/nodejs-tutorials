var http = require('http');
var fs = require('fs');

// var server = http.createServer(function(request, response){
//     console.log('request was made: ' + request.url);
//     response.writeHead(200, {'Content-Type': 'text/plain'});
//     response.end('Hello World');
// });

// server.listen(3000, '127.0.0.1');
// console.log('now listening to port 3000');

//Readable Streams

// var myReadStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');
// var myWriteStream = fs.createWriteStream(__dirname + '/writeMe.txt');

// myReadStream.on('data', function(chunk){
//     console.log('new chunk received');
//     myWriteStream.write(chunk);
// });

// myReadStream.pipe(myWriteStream);

// var server = http.createServer(function(request, response){
//     console.log('request was made: ' + request.url);
//     response.writeHead(200, {'Content-Type': 'text/plain'});
//     var myReadStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');
//     myReadStream.pipe(response);
// });

//Sending html response
// var server = http.createServer(function(request, response){
//     console.log('request was made: ' + request.url);
//     response.writeHead(200, {'Content-Type': 'text/html'});
//     var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
//     myReadStream.pipe(response);
// });


//Serving JSON
// var server = http.createServer(function(req, res){
//     console.log('request was made: ' + req.url);
//     res.writeHead(200,{'Content-Type':'application/json'});
//     var myObj = {
//         name:'Tinky',
//         job: 'Kitty',
//         age: 5
//     };
//     res.end(JSON.stringify(myObj));
// });

// Basic Routing
var server = http.createServer(function(req, res){
    console.log('request was made: ' + req.url);
    if(req.url === '/home' || req.url === '/'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/index.html').pipe(res);
    } else if(req.url === '/contact'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/contact.html').pipe(res);
    } else if(req.url === '/api/ninjas'){
        var ninjas = [{name:'tinky', age:3}, {name:'meg', age:22}];
        res.writeHead(200, {'Content-Type':'application/json'});
        res.end(JSON.stringify(ninjas));
    } else{
        res.writeHead(404, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/404.html').pipe(res);
    }
});

server.listen(3000, '127.0.0.1');
console.log('now listening to port 3000');


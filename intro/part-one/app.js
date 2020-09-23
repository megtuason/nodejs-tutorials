// Node Notes:
// V8 engine embedded into C++ app
// - used to translate javascript to machine language
// - nodejs allows users to use javascript as server-side code

console.log('Hello World!');

//global variable
console.log(__dirname);
console.log(__filename);

//function espressions
function callFunc(func){
    func();
}

var sayHi = function(){
    console.log("hi");
};

callFunc(sayHi);


var stuff = require('./stuff');
console.log(stuff.counter(['shaun', 'meg', 'yel']));
console.log(stuff.adder(6,7));
console.log(stuff.adder(stuff.pi, 6));


//built in modules
var events = require('events');
var myEmitter = new events.EventEmitter();

myEmitter.on('someEvent', function(mssg){
    console.log(mssg);
});

myEmitter.emit('someEvent', 'the event was emitted');


var util = require('util');

var Person = function(name){
    this.name = name;
};

util.inherits(Person, events.EventEmitter);

var james = new Person('james');
var meg = new Person('meg');
var tinky = new Person('tinky');

var people = [james, meg, tinky];

people.forEach(function(person){
    person.on('speak', function(mssg){
        console.log(person.name + " said " + mssg);
    })
});

james.emit('speak', 'hello lol');


//Reading and Writing Files

var fs = require('fs');

// var readme = fs.readFileSync('readme.txt', 'utf8');
// console.log(readme);
// fs.writeFileSync('writeMe.txt', readme);

// fs.readFile('readme.txt', 'utf8', function(err,data){
//     fs.writeFile('writeMe.txt', data, function(err,result){
//         if(err) console.log('error', err);
//     });
// });

//creating and removing directories

// fs.unlink('writeMe.txt', function(err, result){
//     if(err) console.log('error', err);
// });

// fs.mkdirSync('stuff');
// fs.rmdirSync('stuff');

// fs.mkdir('stuff', function(){
//     fs.readFile('readme.txt', 'utf8', function(err, data){
//         fs.writeFile('./stuff/writeMe.txt', data, function(err,result){
//             if(err) console.log('error', err);
//         })
//     })
// })

// fs.unlink('./stuff/writeMe.txt', function(){
//     fs.rmdir('stuff', function(err,result){
//         if(err) console.log('error', err);
//     });
// });


var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to DB
mongoose.connect('mongodb+srv://@cluster0.wvq94.mongodb.net/todo' );

//Create schema 
var todoSchema = new  mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema );
var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){

    app.get('/todo', function(req, res){
        Todo.find({}, function(err,data){
            if (err) throw err;
            res.render('todo', {todos:data});
        })
        res.render('todo', {todos:data});
    });

    app.post('/todo', urlencodedParser, function(req,res){
        //get data from the view and add it to db
        var newTodo = Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
        })
        // data.push(req.body);
        // res.json(data);
    });

    app.delete('/todo/:item', function(req,res){
        // data = data.filter(function(todo){
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        // });
        // res.json(data);
        //delete requested item from DB
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
            if (err) throw err;
            res.json(data);
        })
    });
};
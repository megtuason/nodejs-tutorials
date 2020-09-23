const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
var cookieParser = require('cookie-parser');

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

//Check connection
db.once('open', function(){
    console.log('Connected to MongoDB');
});
//check for db errors
db.on('error', function(err){
    console.log(err);
});

//Init App
const app = express();

//Bring in models
let Article = require('./models/article');

//Load View Engine
app.set('views', path.join(__dirname, 'views' ));
app.set('view engine', 'pug');

//body parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

//Set Public folder
app.use(express.static(path.join(__dirname, 'public')));

//Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}));

//Express Messages Middleware
app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

//Express Validator Middleware
// app.use(expressValidator({
//     errorFormatter: function(param,msg,value){
//         var namespace = param.split('.')
//         , root = namespace.shift()
//         , formParam = root;

//         while(namespace.length){
//             formParam += '[' + namespace.shift() + ']';
//         }
//         return{
//             param: formParam,
//             msg : msg,
//             value : value
//         };
//     }
// }));

app.get('/', function(req, res){
    Article.find({}, function(err, articles){
        if (err){
            console.log(err);
        } else {
            res.render('index', {
                title:'Articles',
                articles:articles
            });
        }
    });
});

app.get('/articles/add', function(req, res){
    res.render('add_article', {
        title:'Articles'
    });
});

app.get('/article/:id', function(req,res){
    Article.findById(req.params.id, function(err, article){
        if (err){
            console.log(err);
        } else {
            res.render('article', {
                article:article
            });
        }
    });
});

app.post('/articles/add', function(req,res){
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
    article.save(function(err){
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });
});

app.get('/article/edit/:id', function(req,res){
    Article.findById(req.params.id, function(err, article){
        if (err){
            console.log(err);
        } else {
            res.render('edit_article', {
                title:'Edit Article',
                article:article
            });
        }
    });
});

app.post('/articles/edit/:id', function(req,res){
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = {_id:req.params.id}
    Article.update(query, article, function(err){
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });
});

app.delete('/article/:id', function(req,res){
    let query = {_id:req.params.id};

    Article.remove(query, function(err){
        if(err){
            console.log(err);
        }
        res.send('Success');
    });
});


app.listen(3000, function(){
    console.log("Server started on port 3000");
});
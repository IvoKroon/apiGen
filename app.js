var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

var db;
if(process.env.ENV == 'Test'){
    db = mongoose.connect('mongodb://localhost/bookApi_test');
}else{
    db = mongoose.connect('mongodb://localhost/bookApi');
}

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.header('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');

    res.header('Allow-header','application/json');
    next();
});


var port = 8080;
var Recipe = require('./models/recipe');
recipeRoutes = require('./routes/recipeRoutes')(Recipe);
app.use('/v1/recipes', recipeRoutes);


app.get('/', function (req, res) {
    res.json({testing:"api"});
});

app.listen(port, function () {
    console.log("Running on PORT " + port);
});

module.exports = app;

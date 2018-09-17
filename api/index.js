
var express = require('express')
var app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const connection = require('./connection');
connection.connect();
app.listen(3000, function () {
    console.log("Running on PORT " + 3000);
});
app.get("/fish", function (req, res) {connection.query("SELECT * FROM Fish", function(error, results, fields) {
        if (error) throw error;
        console.log("The solution is: ", results);
        res.json(results);
      });})
app.post("/fish", function (req, res) {
    const {modelName} = req.body;const {id} = req.body;const {name} = req.body;const {eyes} = req.body;
    connection.query('INSERT INTO Fish SET ?', {name, eyes}, function (error, results, fields) {
        if (error) throw error;
        // Neat!
        console.log("inserted");
        res.json({success:"success"});
      });
      })
app.put("/fish", function (req, res) {res.json({"test":"PUT"})}) 
app.delete("/fish", function (req, res) {res.json({"test":"DELETE"})}) 
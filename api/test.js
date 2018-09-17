
var express = require('express')
var app = express()
app.listen(3000, function () {
    console.log("Running on PORT " + 3000);
});app.get("/car", function (req, res) {res.json({"test":"wukkk"})}) 

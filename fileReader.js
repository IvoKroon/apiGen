const fs = require("fs");
const data = readFile("routing/json.json");

let lines = `
var express = require('express')
var app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const connection = require('./connection');
connection.connect();
app.listen(3000, function () {
    console.log("Running on PORT " + 3000);
});`;
for (let i = 0; i < data.models.length; i += 1) {
  // console.log(Object.keys(data.models[i]).length);
  const keys = Object.keys(data.models[i]);
  const respData = JSON.stringify({ test: "GET" });
  const respDataPost = JSON.stringify({ test: "POST" });
  const respDataPut = JSON.stringify({ test: "PUT" });
  const respDataDelete = JSON.stringify({ test: "DELETE" });
//   console.log()
  const response = createSelectQuery(data.models[i]["modelName"]);
//   console.log
  const responsePost = insertQuery(data.models[i]["modelName"], keys );

 
  // Get the data modal name
  const uri = data.models[i][keys[0]].toLowerCase();
  lines += '\r\napp.get("/'+ uri +'", function (req, res) {'+response+'})';
  lines += '\r\napp.post("/'+ uri +'", function (req, res) {'+responsePost+'})';
  lines += '\r\napp.put("/'+ uri +'", function (req, res) {res.json(' + respDataPut + ")}) ";
  lines += '\r\napp.delete("/'+ uri +'", function (req, res) {res.json(' + respDataDelete + ")}) ";
}
// console.log(lines);
createFile("api/index.js", lines);

// const routing = "";
function createSelectQuery(item){
    return response = `connection.query("SELECT * FROM ${item}", function(error, results, fields) {
        if (error) throw error;
        console.log("The solution is: ", results);
        res.json(results);
      });`
}

function insertQuery(item, parameters){
    console.log(parameters);
    let data = '';
    for(let i = 0; i < parameters.length; i += 1){
        const parameter = parameters[i]
        data += `const {${parameter}} = req.body;`;
    }
    return `
    ${data}
    connection.query('INSERT INTO ${item} SET ?', {name, eyes}, function (error, results, fields) {
        if (error) throw error;
        // Neat!
        console.log("inserted");
        res.json({success:"success"});
      });
      `
}

function createFile(name, data) {
  fs.writeFile(name, data, function(err) {
    if (err) throw err;
    console.log("Saved!");
  });
}

function readFile(name) {
  try {
    var data = fs.readFileSync(name, "utf8");
    let model = JSON.parse(data);
    return model;
  } catch (e) {
    console.log("Error:", e.stack);
  }
}

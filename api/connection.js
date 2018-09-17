var mysql = require("mysql");

module.exports =  mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "node_test",
  port: 8889
});


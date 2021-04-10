var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "database-1.c4ur2n9ixh5x.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "fmtadmin",
    database: "FMTdb"
}); 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;
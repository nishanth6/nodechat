/*requiring mssql node modules */
 var sql = require("mysql");
var method = db.prototype;

function db() {
    /*
    	creating MySql database connection
	*/

      // config for your database
      var config = {
         host: "localhost",
         user: "root",
         password: "" ,
         database : 'chat'
      };
      var conn = new sql.createConnection(config);
      conn.connect(function(err) {
        if (err){
            console.log(err);
            throw err;
        } 
        console.log("Connected!");
         return conn;
        });
}

module.exports = db;

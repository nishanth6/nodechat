/*requiring mssql node modules */
 var mysql = require("mysql");
let connection = {};
const createConnection = function () {
    connection = mysql.createConnection(
        {
            host     : 'localhost',
            user     : 'root',
            // password : 'secret',
            database : 'admin_gamersbe'
        }
    );
    return connection;
};
function getChatHistory (data,cb){
        const conn = createConnection();
        conn.connect();
        console.log(data);
        let  sql ="CALL GetChatHistory("+data.groupId+","+data.isPrivateChat+")";
        conn.query(sql, true,function(err,result){
           if(err) console.log(err);
            conn.end();
            cb(result);
        });
    }
module.exports ={ 
    getChatHistory:getChatHistory
}

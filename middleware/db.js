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
        let  sql ="CALL GetChatHistory("+data.groupId+","+data.isPrivateChat+","+data.userId+")";
        conn.query(sql, true,function(err,result){
           if(err) console.log(err);
            conn.end();
            cb(result);
        });
    }
function addusertogroup (data,cb){
        const conn = createConnection();
        conn.connect();
        console.log(data);
        let  sql ="CALL AddUsersToGroup("+data.groupId+","+data.userid+",'"+data.UserIds+"')";
         conn.query(sql, true,function(err,result){
           if(err) console.log(err);
            conn.end();
             console.log(result);
            cb(result);
        });
    }
 function saveChat (data, cb){
const conn = createConnection();
conn.connect();
let sql = "CALL saveChat("+data.groupId + "," + data.userId + ",'" + data.message + "')";
  console.log(sql);
conn.query (sql, true, function (err, result) {
if(err) console.log(err);
conn.end();
cb(result);
});
} 

function GetUserGroups (data,cb){
        const conn = createConnection();
        conn.connect();
        console.log(data);
        let  sql ="CALL GetUserGroups("+data.userid+")";
         conn.query(sql, true,function(err,result){
           if(err) console.log(err);
            conn.end();
             console.log(result);
            cb(result);
        });
    }
module.exports ={ 
    getChatHistory:getChatHistory,
    addusertogroup:addusertogroup,
    saveChat:saveChat,
    GetUserGroups:GetUserGroups
}

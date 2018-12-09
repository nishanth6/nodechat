/*requiring node modules starts */

var app = require("express")();
var http = require('http').Server(app);
var io = require("socket.io")(http);
var Session = require('express-session');
var cookieParser = require('cookie-parser');
/*requiring node modules ends */
var port = 5000;

// the session is stored in a cookie, so we use this to parse it
app.use(cookieParser());

var Session= Session({
    secret:'secrettokenhere',
    saveUninitialized: true,
	resave: true
});

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
io.use(function(socket, next) {
	    Session(socket.request, socket.request.res, next);
});


app.use(Session);

var sessionInfo;

/* requiring config file starts*/
var config =require('./middleware/config.js')(app);
/* requiring config file ends*/

/* requiring config db.js file starts*/
var db = require("./middleware/db.js");
var connection;

connection=db();
require('./middleware/auth-routes.js') (app,connection,Session,cookieParser,sessionInfo);
require('./middleware/routes.js')(app,connection,io,Session,cookieParser,sessionInfo);

http.listen(port,function(){
    console.log("Listening on http://127.0.0.1:"+port);
});
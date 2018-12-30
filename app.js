/*requiring node modules starts */

var app = require("express")();
var http = require('http').Server(app);
var io = require("socket.io")(http);
var Session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/*requiring node modules ends */
 var port = process.env.PORT || 5000;

// the session is stored in a cookie, so we use this to parse it
app.use(cookieParser());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
var Session= Session({
    secret:'secrettokenhere',
    saveUninitialized: true,
	resave: true
});

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
io.use(function(socket, next) {
	    Session(socket.request, socket.request.res, next);
});


app.use(Session);

var sessionInfo;

/* requiring config file starts*/
///var config =require('./middleware/config.js')(app);
/* requiring config file ends*/

/* requiring config db.js file starts*/
///var db = require("./middleware/db.js");
///var connection;

///connection=db();
///require('./middleware/auth-routes.js') (app,connection,Session,cookieParser,sessionInfo);
require('./middleware/routes.js')(app,io,Session);
require('./middleware/sockets.js')(io);

http.listen(port,function(){
    console.log("Listening on "+port);
});

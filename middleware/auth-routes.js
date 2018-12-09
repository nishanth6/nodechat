/*requiring node modules starts */
 var sql = require("mysql");
var bodyParser = require('body-parser');
var multer  = require('multer');
var fs = require('fs');
/*requiring node modules starts */

/*Telling Multer where to upload files*/
var upload = multer({ dest: './views/uploads' });


var method=routes.prototype;

function routes(app,connection,sessionInfo){

    var file_path="";
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());


	app.get('/', function(req, res){

		sessionInfo=req.session;
		/*Render Login page If session is not set*/
		if(sessionInfo.uid){
			res.redirect('/home#?id='+sessionInfo.uid);
		}else{
			res.render("login");
		}
	});

	/*
		post to handle Login request
	*/
	app.post('/login', function(req, res){


		sessionInfo=req.session;

		username=req.body.username;
		password=req.body.password;
         var request = new sql.Request(connection);
       request.query("select * from [user] where password='"+password+"' and name='"+username+"' ").then(function (result) {
           var uid="";
           result.forEach(function(element, index, array){
             uid=element.id;
           });
           if(result.length>0) {

				//setting session
				sessionInfo.uid = uid;
        request.query("update [user]  set online='Y' where id='"+uid+"'").then(function(re){

         });
				result_send={
			    		is_logged:true,
			    		id:uid,
			    		msg:"OK"
			    };
		    } else {
		    	result_send={
		    		is_logged:false,
		    		id:null,
		    		msg:"BAD"
		    	};
		    }
		    /*
				Sending response to client
			*/
		    res.write(JSON.stringify(result_send));
			res.end();
       }).catch(function (err) {
           console.log(err);
       });

	});
  /*
		post to handle username availability request
	*/
	app.post('/check_name', function(req, res){
    var request = new sql.Request(connection);
  request.query("select * from [user] where name='"+req.body.username+"'").then(function (result) {
    if(result.length>0) {
        result_send={
          msg:true
        };
      } else {
        result_send={
          msg:false
        };
      }
      res.write(JSON.stringify(result_send));
    res.end();
  });
	});

	/*
		post to Register username request
	*/
	app.post('/register', upload.single('file'), function(req, res, next){

		sessionInfo=req.session;
		/*
			Multer file upload starts
		*/
		var file_path = './views/uploads/' + Date.now()+req.file.originalname;
		var file_name = '/uploads/' + Date.now()+req.file.originalname;
		var temp_path = req.file.path;

		var src = fs.createReadStream(temp_path);
		var dest = fs.createWriteStream(file_path);
		src.pipe(dest);
		/*
			Multer file upload ends
		*/
		src.on('end', function() {
			/*
				When uploading of file completes, Insert the user.
			*/
      var query="INSERT INTO [user] (name,password,p_photo,timestamp,online) values "+
       "('"+req.body.username+"','"+req.body.password+"','"+file_name+"','"+Math.floor(new Date() / 1000)+"','Y') SELECT SCOPE_IDENTITY() as insertId";

   var request = new sql.Request(connection);
       request.query(query).then(function (result) {
         				//storing session ID
                  console.log("came here");
                  var uid;
                  result.forEach(function(element, index, array){
                    uid=element.insertId;
                  });
                console.log(uid);
         			sessionInfo.uid = uid;
         				if(result) {
         					result_send={
         			    		is_logged:true,
         			    		id:uid,
         			    		msg:"OK"
         			    	};
         				}else{
         					result_send={
         			    		is_logged:false,
         			    		id:null,
         			    		msg:"BAD"
         			    	};
         				}
         				res.write(JSON.stringify(result_send));
         				res.end();
       });
		});
		src.on('error', function(err) {
			/*
				Sending Error
			*/
			res.write(JSON.stringify("Error"));
			res.end();
		});
	});

	/*
		post to handle Logout request
	*/


}

method.getroutes=function(){
	return this;
}

module.exports = routes;

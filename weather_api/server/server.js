// Require all the necessary modules
var express = require('express');
var bodyParser = require('body-parser');
var path = require("path");

// Setup the port to listen to.
var port = process.env.PORT || 4200

// Instantiate an express app
var app = express();

/*--------- bodyParser ---------*/
// support json encoded bodies
app.use(bodyParser.json()); 
// support encoded bodies
app.use(bodyParser.urlencoded({extended: true}));

/*--------- Static Folder ---------*/
app.use(express.static(path.join(__dirname, '../client/dist')));

/*--------- Routes ---------*/
/* Wildcard Route */
app.all('*', function(req, res) {
	res.sendFile(path.resolve('./client/dist/index.html'));
});

/*--------- Port listening ---------*/
var server = app.listen(port, function() {
	console.log("Server started! Listening at http://localhost:" + port)
});

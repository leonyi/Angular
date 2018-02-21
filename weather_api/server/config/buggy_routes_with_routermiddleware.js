// Require all the necessary modules
var express = require('express'), 
	  router = express.Router(); 

/*--------- Controllers Config ---------*/
var quotes = require('../controllers/quotes.js');


// Route middleware that will happen on every request
router.use(function(req, res, next) {
	// Log each request to the console
	console.log(req.method, req.url, req.params);

	// Go to the route
	next();
});


module.exports = function(app){

	/*--------- Routes ---------*/

	// Route for index.html (the form)
	router.route('/')
		.get(function(req, res) {
			quotes.index(req, res);
			console.log("Inside GET /");

		});

	// Routes that end with /quotes
	router.route('/quotes')
		.get(function(req, res) {
			quotes.index(req, res);
			console.log("Inside GET /quotes!");
		})

		.post(function(req, res) {
			quotes.post(req, res);
			console.log("Inside POST /quotes!");
		});


	// // Root Request // 
	// app.get('/', function(req, res) {
	// 	quotes.index(req, res);
	// });

	// // Other Requests
	// app.post('/quotes', function(req, res) {
	// 	quotes.post(req, res);
	// });

	// app.get('/quotes', function(req, res) {
	// 	quotes.get(req, res);
	// });


	/*--------- Register The Routes ---------*/
	// All routes will be prefixed with /api
	app.use('/', router);

}
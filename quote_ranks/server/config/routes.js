// Require all the necessary modules
var path  = require("path");

/*--------- Controllers Config ---------*/
var quotes = require('../controllers/quotes.js');

module.exports = function(app){
	/*--------- Routes ---------*/
	// Root route
	// app.get('/', function(req, res) {
	//  	quotes.index(req, res);
	// });

	// Routes that end with /quotes
	// Create a new entry (accessed at POST http://localhost:8020/quotes)
	app.post('/quotes', function(req, res) {
		quotes.post(req, res);
	});

	// Handles requests to add a quote from the quote's arrays list in the quoteranking DB record.
	app.post('/quotes/:id/quotes', function(req, res) {
		quotes.postupdate(req, res);
	})

	// Routes that end with /:id
	// Update the entry with this id (accessed at PUT http://localhost:8020/quotes/:id)
	app.get('/quotes/:id', function(req, res) {
		quotes.getone(req, res);
	});

	// Get all the entries (accessed at GET http://localhost:8020/quotes)
	app.get('/quotes', function(req, res) {
		quotes.get(req, res);
	});

	// Update the entry with this id (accessed at PUT http://localhost:8020/quotes/:id)
	app.put('/quotes/:id', function(req, res) {
		quotes.put(req, res);
	});

	// Handles requests to add a quote to the record's array.
	app.put('/quotes/:id/quotes', function(req, res) {
		quotes.putupdate(req, res);
	});

	app.put('/quotes/:id/up', function(req, res) {
		quotes.putupvote(req, res);
	});

	app.put('/quotes/:id/down', function(req, res) {
		quotes.putdownvote(req, res);
	});

	// Delete requests (accessed at DELETE http://localhost:8020/quotes/:id)
	app.delete('/quotes/:id', function(req, res) {
		quotes.deleteone(req, res);
	});

	// Route to remove entry from quotes 
	app.delete('/quotes/:id/:index', function(req, res) {
		quotes.delete(req, res);
	});

	// Catchall route
	app.all('*', function(req, res) {
		console.log('No route matches found! Please check your routes.js config')
		res.sendFile(path.resolve('./../client/dist/index.html'));
	});
}

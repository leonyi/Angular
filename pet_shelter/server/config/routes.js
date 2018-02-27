// Require all the necessary modules
var path  = require("path");

/*--------- Controllers Config ---------*/
var pets = require('../controllers/pets.js');

module.exports = function(app){
	/*--------- Routes ---------*/
	// Root route
	// app.get('/', function(req, res) {
	//  	pets.index(req, res);
	// });

	// Routes that end with /pets
	// Create a new entry (accessed at POST http://localhost:8020/pets)
	app.post('/pets', function(req, res) {
		pets.post(req, res);
	});

	// Handles requests to add a quote from the quote's arrays list in the quoteranking DB record.
	app.post('/pets/:id/pets', function(req, res) {
		pets.postupdate(req, res);
	})

	// Routes that end with /:id
	// Update the entry with this id (accessed at PUT http://localhost:8020/pets/:id)
	app.get('/pets/:id', function(req, res) {
		pets.getone(req, res);
	});

	// Get all the entries (accessed at GET http://localhost:8020/pets)
	app.get('/pets', function(req, res) {
		pets.get(req, res);
	});

	// Update the entry with this id (accessed at PUT http://localhost:8020/pets/:id)
	app.put('/pets/:id', function(req, res) {
		pets.put(req, res);
	});

	app.put('/pets/:id/pets', function(req, res) {
		pets.putupdate(req, res);
	});

	app.put('/pets/:id/up', function(req, res) {
		pets.putuplikes(req, res);
	});

	app.put('/pets/:id/down', function(req, res) {
		pets.putdownvote(req, res);
	});

	// Delete requests (accessed at DELETE http://localhost:8020/pets/:id)
	app.delete('/pets/:id', function(req, res) {
		pets.deleteone(req, res);
	});

	// Route to remove entry from pets 
	app.delete('/pets/:id/:index', function(req, res) {
		pets.delete(req, res);
	});

	// Catchall route
	app.all('*', function(req, res) {
		console.log('No route matches found! Please check your routes.js config')
		res.sendFile(path.resolve('./../client/dist/index.html'));
	});
}

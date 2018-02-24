// Require all the necessary modules
var path  = require("path");

const express = require('express'),
	  router = express.Router()
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      Quote = mongoose.model('Quote'); 

module.exports = {
	// index: function(req, res) {
	// 	res.json( {message: "Welcome to this awesome API!"} );
	// },

	// Create a new post (accessed at POST http://localhost:8020/quotes)
	post: function(req, res) {
		console.log("Adding new entry to the DB: ", req.params )
		let quote = new Quote({quotes: req.body.quotes, author: req.body.author});

		quote.save(function(err) {
			if(err) {
				console.log("Something went wrong while saving the new entries: ", err)
				res.json({message: "ERROR", error: err});
			} else {
				console.log("Successfully added the new entry: ", quote);
				res.json({message: "Success", data: quote});
			}
		})
	}, 

	// Update a quoterank entry with quotes

	// Get all the entries (accessed at GET http://localhost:8020/quotes)
	get: function(req, res) {
		console.log("GET: Show all entries", req.body);
		Quote.find({}).sort('-createdAt').exec(function(err, quotes) {
			if(err) {
				console.log("Something went wrong while retrieving data from the database: ", err);
				res.json({message: "Error retrieving your tasks.", error: err});
			} else{
				console.log("Successfully retrieved all quotes: ", quotes)
				res.json({data: quotes});
			}
		})
	},

	// Find the entry with this id (accessed at PUT http://localhost:8020/quotes/:id)	
	getone: function(req, res) {
		// Quote.findById(req.params.id, function(err, quote) {
		Quote.find({ _id: req.params.id }, function(err, quote) {
			if (err) {
				console.log("Error retrieving requested entry: ", err)
				res.json({message: "Error retrieving requested entry!"})
			} else {
				console.log("Successfully retrieved requested entry: ", quote )
				res.json({data: quote});
			}
		})
	},

	// Update the entry with this id (accessed at PUT http://localhost:8030/quotes/:quotes_id)
	// Update quoterank's author name. 
	put: function(req, res) {
		var data = {};
		data.author = req.body.author;

		Quote.update({_id: req.params.id}, data, function(err, quote) {
			if(err){
				console.log("Error attempting to save changes to entry!")
				res.json({ message: "Errors attempting to update entry!"})
			} else {
				console.log("Entry updated Successfully!", quote)
				res.json({ message: "Entry updated!"});	
			}
		})

	}, 

	// Update quoterank's quotes list.
	postupdate: function(req, res) {
		var data = {
			quote: req.body.quotecontent, 
			rank: 0
		}
		Quote.findOneAndUpdate({_id: req.params.id}, { $push: { quotes: data }}, function(err, quote) {
			if(err){
				console.log("Error attempting to update quotes array with record id: ", req.params.id)
				res.json({ message: "Errors attempting to update entry!"})
			} else {
				console.log("Entry updated Successfully!", quote)
				res.json({ message: "Entry updated!", quotes: quote});	
			}
		})

	},

    // Delete the entry with this id (accessed at DELETE http://localhost:8030/quotes/:id)
	deleteone: function(req, res) {
		Quote.findByIdAndRemove(req.params.id, function(err, quote) {
			if (err) {
				console.log("Error attempting to delete requested record: ", req.params.id )
				res.json(err);
			} else {
				console.log("Successfully removed record: ", req.params.id);
				res.json({message: 'Successfully deleted.'})
			}
		});
	},

    // Delete element from array within record (accessed at DELETE http://localhost:8030/quotes/:id/:index)
	delete: function(req, res) {
		Quote.findById(req.params.id, function(err, quote) {
			if (err) {
				console.log("Error attempting to delete requested record: ", req.params.id )
				res.json(err);
			} else {
				const quoteList = quote.quotes;
				console.log("quotes.js controller: quoteList is ", quoteList);
				// Splice removes the number of elements specified at the given index location. 
				// So, we update the current quoteList and then update the entry on the DB.
				quoteList.splice(req.params.index, 1); 
				quote.update( {$set: {quotes: quoteList}}, function(err, quote) {
					if(err) {
						console.log('Error updating record after quote removal: ', req.params.id);
						res.json({err})
					} else {
						console.log("Successfully removed quote from record: ", req.params.id);
						res.json({message: 'Successfully deleted quote from record.'})
					}
				})
			}
		});
	},

	// upVote quote rank on record.
	putupvote: function(req, res) {
		Quote.findById(req.params.id, function(err,quote) {
			if (err) {
				console.log("Error attempting to locate requested record: ", req.params.id);
				res.json(err)
			} else {
				const quoteList = quote.quotes; 
				console.log("Current quote list is: ", quoteList);
				quoteList[req.body.index].rank += 1;
				quote.update( {$set: {quotes: quoteList }}, function(err, quote) {
					if(err) {
						console.log(`Error increasing vote for ${req.params.id} at index ${req.body.index}`);
					} else {
						console.log("Successfully updated rank for quote: ", req.params.id);
						res.json({message: 'Successfully updated record with new rank.'})
					}
				})
			}

		});
	},

	// downVote quote rank on record.
	putdownvote: function(req, res) {
		Quote.findById(req.params.id, function(err,quote) {
			if (err) {
				console.log("Error attempting to locate requested record: ", req.params.id);
				res.json(err)
			} else {
				const quoteList = quote.quotes; 
				console.log("Current quote list is: ", quoteList);
				quoteList[req.body.index].rank -= 1;
				quote.update( {$set: {quotes: quoteList }}, function(err, quote) {
					if(err) {
						console.log(`Error lowering rank for ${req.params.id} at index ${req.body.index}`);
					} else {
						console.log("Successfully updated rank for quote: ", req.params.id);
						res.json({message: 'Successfully updated record with new rank.'})
					}
				})
			}

		});
	} 
}

const mongoose = require('mongoose');

// Creating the Mongoose Schema //
// Schema object constructor //
// This can also go under models/quotes.js
var QuoteSchema = new mongoose.Schema( {
		author: { type: String, required: true, minlength: 3}, 
		quotes: [{
			quote: String,
			rank: Number
		}] 
	}, { timestamps: true }
)

// Creates the blueprint object and, in turn, creates the necessary database collection
// out of the model.
mongoose.model('Quote', QuoteSchema);   // Setting this Schema in our Models as 'Quote'
var Quote = mongoose.model('Quote')     // Retrieving this Schema from our Models, named 'Quote'

const mongoose = require('mongoose');

// Creating the Mongoose Schema //
// Schema object constructor //
// This can also go under models/Pets.js
var PetSchema = new mongoose.Schema( {
		name: { type: String, required: true, minlength: 3}, 
		type: { type: String, required: true, minlength: 3}, 
		description: { type: String, required: true, minlength: 3}, 
		skills: [{
			skill: { type: String, required: false, minlength: 3},
		}],
		likes: { type: Number, required: false, default: 0}		
	}, { timestamps: true }
)

// Creates the blueprint object and, in turn, creates the necessary database collection
// out of the model.
mongoose.model('Pet', PetSchema);   // Setting this Schema in our Models as 'Pet'
var Pet = mongoose.model('Pet')     // Retrieving this Schema from our Models, named 'Pet'

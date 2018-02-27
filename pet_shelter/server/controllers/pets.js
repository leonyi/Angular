// Require all the necessary modules
var path  = require("path");

const express = require('express'),
	  router = express.Router()
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      Pet = mongoose.model('Pet'); 

module.exports = {
	// index: function(req, res) {
	// 	res.json( {message: "Welcome to this awesome API!"} );
	// },

	// Create a new post (accessed at POST http://localhost:8020/pets)
	post: function(req, res) {
		console.log("Adding new entry to the DB: ", req.params )
		let pet = new Pet({
			name: req.body.name, 
			type: req.body.type,
			description: req.body.description,
			likes: req.body.likes,
			skills: req.body.skills
		});

		pet.save(function(err) {
			if(err) {
				console.log("Something went wrong while saving the new entries: ", err)
				res.json(err);
			} else {
				console.log("Successfully added the new entry: ", pet);
				res.json({message: "Success", data: pet});
			}
		})
	}, 

	// Update a petrank entry with pets

	// Get all the entries (accessed at GET http://localhost:8020/pets)
	get: function(req, res) {
		console.log("GET: Show all entries", req.body);
		Pet.find({}).sort('-createdAt').exec(function(err, pets) {
			if(err) {
				console.log("Something went wrong while retrieving data from the database: ", err);
				res.json({message: "Error retrieving your tasks.", error: err});
			} else{
				console.log("Successfully retrieved all pets: ", pets)
				res.json({data: pets});
			}
		})
	},

	// Find the entry with this id (accessed at PUT http://localhost:8020/pets/:id)	
	getone: function(req, res) {
		// Pet.findById(req.params.id, function(err, pet) {
		Pet.find({ _id: req.params.id }, function(err, pet) {
			if (err) {
				console.log("Error retrieving requested entry: ", err)
				res.json({message: "Error retrieving requested entry!"})
			} else {
				console.log("Successfully retrieved requested entry: ", pet )
				// res.json({data: pet});
				res.json(pet);
			}
		})
	},

	// Update the entry with this id (accessed at PUT http://localhost:8030/pets/:pets_id)
	put: function(req, res) {
		var data = {};
		data.name = req.body.name;
		data.type = req.body.type;
		data.description = req.body.description;

		Pet.update({_id: req.params.id}, data, function(err, pet) {
			if(err){
				console.log("Error attempting to save changes to entry!")
				res.json({ message: "Errors attempting to update entry!", error: err})
			} else {
				console.log("Entry updated Successfully!", pet)
				res.json({ message: "Entry updated!"});	
			}
		})

	}, 

	// Update pet rank pets list.
	postupdate: function(req, res) {
		var data = {
			pet: req.body.petcontent, 
			rank: 0
		}
		Pet.findOneAndUpdate({_id: req.params.id}, { $push: { pets: data }}, function(err, pet) {
			if(err){
				console.log("Error attempting to update pets array with record id: ", req.params.id)
				res.json(err)
			} else {
				console.log("Entry updated Successfully!", pet)
				res.json({ message: "Entry updated!", pets: pet});	
			}
		})

	},

    // Delete the entry with this id (accessed at DELETE http://localhost:8030/pets/:id)
	deleteone: function(req, res) {
		Pet.findByIdAndRemove(req.params.id, function(err, pet) {
			if (err) {
				console.log("Error attempting to delete requested record: ", req.params.id )
				res.json(err);
			} else {
				console.log("Successfully removed record: ", req.params.id);
				res.json({message: 'Successfully deleted.'})
			}
		});
	},

    // Delete element from array within record (accessed at DELETE http://localhost:8030/pets/:id/:index)
	delete: function(req, res) {
		Pet.findById(req.params.id, function(err, pet) {
			if (err) {
				console.log("Error attempting to delete requested record: ", req.params.id )
				res.json(err);
			} else {
				const petList = pet.pets;
				console.log("pets.js controller: petList is ", petList);
				// Splice removes the number of elements specified at the given index location. 
				// So, we update the current petList and then update the entry on the DB.
				petList.splice(req.params.index, 1); 
				pet.update( {$set: {pets: petList}}, function(err, pet) {
					if(err) {
						console.log('Error updating record after pet removal: ', req.params.id);
						res.json({err})
					} else {
						console.log("Successfully removed pet from record: ", req.params.id);
						res.json({message: 'Successfully deleted pet from record.'})
					}
				})
			}
		});
	},

	// 

	// upVote pet rank on record.
	putuplikes: function(req, res) {
		Pet.findById(req.params.id, function(err,pet) {
			if (err) {
				console.log("Error attempting to locate requested record: ", req.params.id);
				res.json(err)
			} else {
				// pets.likes +=1;
				pet.update( {$inc: { likes: 1 }}, function(err, pet) {
					if(err) {
						console.log(`Error increasing vote for ${req.params.id} at index ${req.body.index}`);
					} else {
						console.log("Successfully updated rank for pet: ", req.params.id);
						res.json({message: 'Successfully updated record with new rank.'})
					}
				})
			}
	
			});
	}
}

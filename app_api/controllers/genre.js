var ethnic = '' , async = require('async') , Eyon = require('../models/eyon') , Genre = require('../models/genre') , config = require('../config/config') , genre = '' , gValue = '' , gParam = '';


module.exports = {

	'genreList' : (req , res) => {
		
		Genre.find({})
											.exec(function(err , genreResult) {
																														if (err) {
																																									config.response(res , 404 , err);
																																																										return;	}
																														if (!genreResult) {
																																									config.response(res , 404 , {'message' : 'Genre cannot be found'});
																																																																												return;	}
																																									config.response(res , 200 , genreResult);																					});				
	},

	'genreAdd' : (req , res) => {	gValue = req.body , genre = new Genre(gValue);
		
			genre.save((err , genreResult) => {
																								if (err) {
																														config.response(res , 404 , err);
																																															return;	}
																														
																														config.response(res , 200 , genreResult);		});
	}
	
}
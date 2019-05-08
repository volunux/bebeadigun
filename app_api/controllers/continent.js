var ethnic = '' , async = require('async') , Eyon = require('../models/eyon') , Continent = require('../models/continent') , config = require('../config/config') , continent = '' , cValue = '' , cParam = '';


module.exports = {

	'continentList' : (req , res) => {
		
		Continent.find({})
											.exec(function(err , continentResult) {
																															if (err) {
																																										config.response(res , 404 , err);
																																																											return;	}
																															if (!continentResult) {
																																										config.response(res , 404 , {'message' : 'Continent cannot be found'});
																																																																													return;	}
																																										config.response(res , 200 , continentResult);																					});				
	},

	'continentAdd' : (req , res) => {	cValue = req.body , continent = new Continent(cValue);
		
			continent.save((err , continentResult) => {
																									if (err) {
																															config.response(res , 404 , err);
																																																return;	}
																															
																															config.response(res , 200 , continentResult);		});
	}
	
}
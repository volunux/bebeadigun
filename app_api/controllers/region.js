var ethnic = '' , async = require('async') , Eyon = require('../models/eyon') , Region = require('../models/region') , config = require('../config/config') , region = '' , rValue = '' , rParam = '';


module.exports = {

	'regionList' : (req , res) => {
		
		Region.find({})
											.exec(function(err , regionResult) {
																															if (err) {
																																										config.response(res , 404 , err);
																																																											return;	}
																															if (!regionResult) {
																																										config.response(res , 404 , {'message' : 'Region cannot be found'});
																																																																													return;	}
																																										config.response(res , 200 , regionResult);																					});				
	},

	'regionAdd' : (req , res) => {	rValue = req.body , region = new Region(rValue);
		
			region.save((err , regionResult) => {
																									if (err) {
																															config.response(res , 404 , err);
																																																return;	}
																															
																															config.response(res , 200 , regionResult);		});
	}
	
}
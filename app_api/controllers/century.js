var ethnic = '' , async = require('async') , Eyon = require('../models/eyon') , Century = require('../models/century') , config = require('../config/config') , century = '' , cValue = '' , cParam = '';


module.exports = {

	'centuryList' : (req , res) => {
		
		Century.find({})
											.exec(function(err , centuryResult) {
																														if (err) {
																																									config.response(res , 404 , err);
																																																										return;	}
																														if (!centuryResult) {
																																									config.response(res , 404 , {'message' : 'Century cannot be found'});
																																																																												return;	}
																																									config.response(res , 200 , centuryResult);																					});				
	},

	'centuryAdd' : (req , res) => {	cValue = req.body , century = new Century(cValue);
		
			century.save((err , centuryResult) => {
																								if (err) {
																														config.response(res , 404 , err);
																																															return;	}
																														
																														config.response(res , 200 , centuryResult);		});
	}
	
}
var ethnic = '' , async = require('async') , Eyon = require('../models/eyon') , Country = require('../models/country') , Art = require('../models/art') , config = require('../config/config') ,

art = '' , aValue = '' , aParam = '';

module.exports = {

	'artName' : (req , res) => {		art = req.params.art.split('-').join(' ');
	
		Art.findOne({'title' : new RegExp(art, 'i')})
																									.exec((err , artResult) => {
																																								if (err) {
																																																				config.response(res , 404 , err);
																																																																						return;	}
																																								if (!artResult) {
																																																				config.response(res , 404 , {'message' : 'Art cannot be found'});
																																																																																					return;	}
																																																				config.response(res , 200 , artResult);																					});
	},

	'arts' : (req , res , next) => {

								Art.find({})
															.exec((err , artResult) => {
																														if (err) {
																																								config.response(res , 404 , err);
																																																									return;	}
																														if (!artResult) {
																																								config.response(res , 404 , {'message' : 'Art cannot be found'});
																																																																											return;	}
																																								config.response(res , 200 , artResult);																					});
	} , 


	'artEthnic' : (req , res , next) => {	ethnic = req.params.ethnic;

		async.waterfall([
																				(callback) => {
																																	Eyon.findOne({'eyon' : new RegExp(ethnic, 'i')})
																																																														.exec((err , ethnicResult) => {
																																																																																callback(null , ethnicResult);	});	
																																																							} ,
																				(arg1 , callback) => { ethnic = arg1['_id'];

																																	Art.find({'ethnic_group' : ethnic})
																																																														.exec((err , artsResult) => {
																																																																																callback(null , artsResult);		})
																																																							}]	, 
																				(err , result) => {	
																															if (err) {
																																								config.response(res , 404 , err);
																																																									return;		}
																															if (!result) {
																																								config.response(res , 404 , {'message' : 'Data cannot be retrieved'});
																																																																												return;		}
																																								config.response(res , 200 , result);																																	});
	} ,
		
	'artDetail' : (req , res , next) => {	art = req.params.art.split('-').join(' ');

		if (req.params && req.params.art) {
			
			Art.findOne({'title' : new RegExp(art , 'i')})
																											.exec(function(err , artResult) {
																																													if (err) {
																																																								config.response(res , 404 , err);
																																																																									return;	}
																																													if (!artResult) {
																																																								config.response(res , 404 , {'message' : 'Art cannot be found'});
																																																																																											return;	}
																																																								config.response(res , 200 , artResult);
																																											})		}		else {
																																																								config.response(res , 404 , {'message' : 'No Art Id Found'});
																																																					}
	} , 

	'artAdd' : (req , res , next) => {		
		
		async.parallel({
																									'Eyon' : (callback) => {
																																											Eyon.find({}).exec(callback);
																									} ,

																									'Country' : (callback) => {
																																											Country.find({}).exec(callback);
																									}
			} , (err , result) => {	
																		if (err) {
																											config.response(res , 404 , err);
																																												return;		}
																		if (!result) {
																											config.response(res , 404 , {'message' : 'Data cannot be retrieved'});
																																																															return;		}
																											config.response(res , 200 , result);																																															});
	} , 

	'artAddSubmit' : (req , res , next) => {	var art = new Art(req.body);

		art.save((err) => {
																if (err) {
																										config.response(res , 400 , err);
																				}	else {
																										config.response(res , 200 , {'message' : 'success'});
																}																																						})
	} , 

	'artUpdate' : (req , res , next) => {		art = req.params.art.split('-').join(' ');

		async.parallel({
																									'Eyon' : (callback) => {
																																											Eyon.find({}).exec(callback);
																									} ,

																									'Country' : (callback) => {
																																											Country.find({}).exec(callback);
																									} ,

																									'Art' : (callback) => {
																																								Art.findOne({'title' : new RegExp(art , 'i')})
																																																																				.exec(callback) }	
			}, (err , result) => {	
																		if (err) {
																											config.response(res , 404 , err);
																																												return;		}
																		if (!result) {
																											config.response(res , 404 , {'message' : 'Data cannot be retrieved'});
																																																															return;		}
																											config.response(res , 200 , result);																																																				})
	} , 

	'artUpdateSubmit' : (req , res , next) => {	aValue = req.body , aParam = req.params.art.split('-').join(' ');

				if (req.params && req.params.art) {

		Art.findOneAndUpdate({'title' : new RegExp(aParam , 'i')} , aValue , (err) => {
																																												if (err) {
																																																			config.response(res , 404 , err);
																																																																					return;	}

																																																			config.response(res , 201 , {'message' : 'Successful request.'});						});
							} else {
													config.response(res , 404 , {'message' : 'No Art id found'});		}
	} , 

	'artDelete' : (req , res , next) => {	art = req.params.art.split('-').join(' ');
		
		Art.findOneAndRemove({'title' : new RegExp(art , 'i')} , (err) => {
																																									if (err) {
																																															config.response(res , 404 , err);
																																																																return;		}

																																															config.response(res , 204 , {'message' : 'success'});																});
	} 
	
}				
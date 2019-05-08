var ethnic = '' , alpha = '' , async = require('async') , Eyon = require('../models/eyon') , Country = require('../models/country') , Century = require('../models/century') , Specie = require('../models/specie') ,

Photo = require('../models/photo') , Genre = require('../models/genre') ,  Continent = require('../models/continent') , Region = require('../models/region') , config = require('../config/config') ,

pValue = '' , pParam = '' , photo = '' , ethnic = '';

module.exports = {

	'photos' : (req , res , next) => {

								Photo.find({})
																.exec((err , photoResult) => {
																																if (err) {
																																									config.response(res , 404 , err);
																																																											return;	}
																																if (!photoResult) {
																																										config.response(res , 404 , {'message' : 'Photos not available.'});
																																																																													return;	}
																																										config.response(res , 200 , photoResult);																					});
	} , 


	'photoEthnic' : (req , res , next) => {	ethnic = req.params.ethnic;

								async.waterfall([
																				(callback) => {
																																	Eyon.findOne({'eyon' : new RegExp(ethnic , 'i')})
																																																														.exec((err , ethnicResult) => {
																																																																																callback(null , ethnicResult);	});	
																																																							} ,
																				(arg1 , callback) => { 
																																if(arg1 === null) {		arg1 = {};
																																																	arg1['_id'] = 2233232		}
																																																															ethnic = arg1['_id'];

																																	Photo.find({'ethnic_group' : ethnic})
																																																														.exec((err , photosResult) => {
																																																																																callback(null , photosResult);		})
																																																							}]	, 
																				(err , result) => {	
																															if (err) {
																																								config.response(res , 404 , err);
																																																									return;		}
																															if (!result) {
																																								config.response(res , 404 , {'message' : 'Ethnic Group doesn\'t exist or no photos available'});

																																																																														return;		}
																																								config.response(res , 200 , result);																																	});
	} ,

	'photoCountry' : (req , res , next) => {	country = req.params.country;

								async.waterfall([
																				(callback) => {
																																	Country.findOne({'name' : new RegExp(country , 'i')})
																																																														.exec((err , ethnicResult) => {
																																																																																callback(null , ethnicResult);	});	
																																																							} ,
																				(arg1 , callback) => { 
																																if(arg1 === null) {		arg1 = {};
																																																	arg1['_id'] = 2233232		}
																																																															country = arg1['_id'];

																																	Photo.find({'country' : country})
																																																														.exec((err , photosResult) => {
																																																																																callback(null , photosResult);		})
																																																							}]	, 
																				(err , result) => {	
																															if (err) {
																																								config.response(res , 404 , err);
																																																									return;		}
																															if (!result) {
																																								config.response(res , 404 , {'message' : 'Country doesn\'t exist or no photos available for this country'});
																																								
																																																																														return;		}
																																								config.response(res , 200 , result);																																	});
	} ,
		
	'photoDetail' : (req , res , next) => {	photo = req.params.photo;

		if (req.params && req.params.photo) {
			
			Photo.findOne({'photo-url' : new RegExp(photo , 'i')})
																															.exec((err , photoResult) => {
																																																	if (err) {
																																																												config.response(res , 404 , err);
																																																																													return;	}
																																																	if (!photoResult) {
																																																												config.response(res , 404 , {'message' : 'Photo cannot be found.'});
																																																																																															return;	}
																																																												config.response(res , 200 , photoResult);
																																															})		}		else {
																																																												config.response(res , 404 , {'message' : 'No Photo Id provided.'});
																																																									}
	} , 

	'photoAdd' : (req , res , next) => {		
		
			async.parallel({
																									'Eyon' : (callback) => {
																																											Eyon.find({}).exec(callback);
																									} ,

																									'Country' : (callback) => {
																																											Country.find({}).exec(callback);
																									} ,

																									'Genre' : (callback) => {
																																											Genre.find({}).exec(callback);
																									} ,

																									'Continent' : (callback) => {
																																											Continent.find({}).exec(callback);
																									} ,

																									'Region' : (callback) => {
																																											Region.find({}).exec(callback);
																									} ,

																									'Century' : (callback) => {
																																											Century.find({}).exec(callback);
																									}
			}, (err , result) => {	
																		if (err) {
																											config.response(res , 404 , err);
																																												return;		}
																		if (!result) {
																											config.response(res , 404 , {'message' : 'Data\'s cannot be retrieved'});
																																																																return;		}
																											config.response(res , 200 , result);																																																					});
	} , 

'photoAddSubmit' : (req , res , next) => {	var photo = new Photo(req.body);

		photo.save((err) => {
																if (err) {
																										config.response(res , 400 , err);
																			}	else {
																										config.response(res , 200 , {'message' : 'Photo successfully uploaded.'});
																}																																																																																			})
	} , 

	'photoUpdate' : (req , res , next) => {		photo = req.params.photo;

		async.parallel({
																									'Eyon' : (callback) => {
																																											Eyon.find({}).exec(callback);
																									},

																									'Country' : (callback) => {
																																											Country.find({}).exec(callback);
																									} ,

																									'Genre' : (callback) => {
																																											Genre.find({}).exec(callback);
																									} ,

																									'Continent' : (callback) => {
																																											Continent.find({}).exec(callback);
																									} ,

																									'Region' : (callback) => {
																																											Region.find({}).exec(callback);
																									} ,

																									'Century' : (callback) => {
																																											Century.find({}).exec(callback);
																									} ,

																									'Photo' : (callback) => {
																																								Photo.findOne({'photo-url' : new RegExp(photo , 'i')})
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

	'photoUpdateSubmit' : (req , res , next) => {	pValue = req.body , pParam = req.params.photo;

				if (req.params && req.params.photo) {

		Photo.findOneAndUpdate({'photo-url' : new RegExp(pParam , 'i')} , pValue , (err) => {
																																													if (err) {
																																																			config.response(res , 404 , err);
																																																																					return;	}

																																																			config.response(res , 201 , {'message' : 'Photo successfully updated.'});						});
							} else {
													config.response(res , 404 , {'message' : 'No Photo id provided'});		}
	} , 

	'photoDelete' : (req , res , next) => {	photo = req.params.photo;
		
		Photo.findOneAndRemove({'photo-url' : new RegExp(photo , 'i')} , (err) => {
																																									if (err) {
																																															config.response(res , 404 , err);
																																																																return;		}

																																															config.response(res , 204 , {'message' : 'Photo successfully deleted'});										});
	} ,

	'photoVote' : (req , res , next) => { pValue = req.params.photo

		Photo.findOne({'photo-url' : pValue} , (err, photo) => {
					
					if (!err && photo) {														
																photo.vote = photo.vote + 1;
																															photo.save((err) => {
																																										if (err) {
																																																res.json(err);
																																																								} else {
																																																													res.json({ 'vote': photo.vote });
																																																										}
																																																						});
																																																				}
																																															});	
		}
	
}				
var mongoose = require('mongoose') ,	Schema = mongoose.Schema , slug = require('mongoose-slug-updater');


const fileSchema = new Schema({
																'filename' : {	'type' : String	} ,
																																			'path' : String ,
																																												'mimetype' : String , 
																																																							'encoding' :  String ,
																																																																			'size' : Number 			});

var photoSchema = new Schema({
																	'title' : {
																								'type' : String ,
																																	'maxlength' : 150 ,
																																											'required' : true ,
																																																					'minlength' : 1			} ,
																		'date' : {
																									'type' : String , 
																																			'maxlength' : 100 ,
																																														'required' : true ,
																																																									'minlength' : 1 } ,
																			'century' : {
																											'type' : Schema.Types.ObjectId ,
																																												'ref' : 'Century' ,
																																																							'autopopulate' : true 	} ,
																				'genre' : {
																												'type' : Schema.Types.ObjectId ,
																																													'ref' : 'Genre' ,
																																																							'autopopulate' : true 	} ,
																					'country' : {
																													'type' : Schema.Types.ObjectId ,
																																														'ref' : 'Country' ,
																																																									'autopopulate' : true 	} ,
																						'continent' : {
																														'type' : Schema.Types.ObjectId ,
																																															'ref' : 'Continent' ,
																																																										'autopopulate' : true 	} ,
																							'region' : {
																															'type' : Schema.Types.ObjectId ,
																																																'ref' : 'Region' ,
																																																										'autopopulate' : true 	} ,
																								'ethnic_group' : {
																																		'type' : Schema.Types.ObjectId ,
																																																			'ref' : 'Eyon' ,
																																																												'autopopulate' : true 	} ,
																									'about' : {
																															'type' : String ,
																																								'maxlength' : 10000 ,
																																																		 		'required' : true ,
																																																		 										 		'minlength' : 1			} ,
																										'artist' : {
																																	'type' : String ,
																																										'maxlength' : 50 		} ,
																										'findspot' : {
																																		'type' : String ,
																																											'maxlength' : 50 			} ,
																											'medium' : {
																																		'type' : String ,
																																											'maxlength' : 50 	} ,
																												'credit' : {
																																			'type' : String ,
																																												'maxlength' : 50 	} ,
																													'dimension' : {
																																					'type' : String ,
																																														'maxlength' : 200 } ,

																														'photo_detail' : fileSchema ,


																															'vote' : {
																																					'type' : 'Number' ,
																																																'default' : 0		} ,
																																'date_created' : {
																																										'type' : Date ,
																																																			'default' : Date.now 	} ,
																																	'photo-url' : {
																																										'type' : String ,
																																																				'slug' : 'title' ,
																																																														'unique' : true ,
																																																																							'slugPaddingSize' : 3		}
},	{
				'toObject' : {
												'virtuals' : true
				},
						'toJSON' : {
													'virtuals' : true
						},
								'getters' : true
});


photoSchema.plugin(require('mongoose-autopopulate'));

mongoose.plugin(slug);

module.exports = mongoose.model('Photo' , photoSchema);
var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var nameSchema = new Schema({

															'name' : {
																					'type' : String ,
																														'maxlength' : 150	,
																																									'required' : true ,
																																																			'minlength' : 5	} ,
																'meaning' : {
																							'type' : String ,
																																	'maxlength' : 500	} ,

																	'morphology' : {
																										'type' : String ,
																																				'maxlength' : 300	} ,

																		'gloss' : {
																								'type' : String ,
																																		'maxlength' : 300	} ,

																			'people' : {
																										'type' : String ,
																																			'maxlength' : 1000	} ,

																				'alphabet' : {	
																												'type' : Schema.Types.ObjectId ,
																																													'ref' : 'Alphabet' ,
																																																								'autopopulate' : true 	} ,

																				'continent' : {
																												'type' : Schema.Types.ObjectId ,
																																													'ref' : 'Continent' ,
																																																								'autopopulate' : true 	} ,

																					'region' : {
																												'type' : Schema.Types.ObjectId ,
																																													'ref' : 'Continent' ,
																																																								'autopopulate' : true 	} ,

																					'ethnic_group' : {
																															'type' : Schema.Types.ObjectId ,
																																																'ref' : 'Eyon' ,
																																																									'autopopulate' : true 	} ,

																						'gender' : {
																													'type' : Schema.Types.ObjectId ,	
																																														'ref' : 'Gender' ,	
																																																								'autopopulate' : true 	} ,

																							'baby' : {	
																													'type' : Schema.Types.ObjectId ,	
																																														'ref' : 'Baby' ,
																																																							'autopopulate' : true 	} ,

																								'specie' : {
																															'type' : Schema.Types.ObjectId ,	
																																																'ref' : 'Specie' ,
																																																										'autopopulate' : true 	}
},	{
				'toObject' : {
												'virtuals' : true
				},
						'toJSON' : {
													'virtuals' : true
						},
								'getters' : true
});

nameSchema.plugin(require('mongoose-autopopulate'));


nameSchema
						.virtual('url')
														.get(function () {
  																							return '/name/' + this.name;
				});

module.exports = mongoose.model('Name' , nameSchema);
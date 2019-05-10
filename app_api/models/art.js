var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var artSchema = new Schema({
																	'title' : {
																								'type' : String ,
																																	'maxlength' : 150 ,
																																											'required' : true ,
																																																					'minlength' : 1			} ,
																					'country' : {
																															'type' : Schema.Types.ObjectId ,
																																																'ref' : 'Country' ,
																																																										'autopopulate' : true 	} ,
																							'ethnic_group' : {
																																	'type' : Schema.Types.ObjectId ,
																																																		'ref' : 'Eyon' ,
																																																											'autopopulate' : true 	} ,
																											'art_markup' : {
																																				'type' : String ,
																																													'maxlength' : 100000 ,
																																																							 		'required' : true ,
																																																							 										 		'minlength' : 1			} ,
																													'art_body' : {
																																					'type' : String ,
																																														'maxlength' : 100000 ,
																																																										'required' : true ,
																																																																				'minlength' : 1			}
},	{
				'toObject' : {
												'virtuals' : true
				},
						'toJSON' : {
													'virtuals' : true
						},
								'getters' : true
});

artSchema
							.virtual('url')
															.get(function () {
	  																							return String(this.title).toLowerCase().split(' ').join('-');
					});


artSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Art' , artSchema);
var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var centurySchema = new Schema({
																	'century' : {
																								'type' : String,
																																	'minlength' : 0,
																																										'required' : true ,
																																																				'maxlength' : 30
																			}
},	{
				'toObject' : {
												'virtuals' : true
				},
						'toJSON' : {
													'virtuals' : true
						},
								'getters' : true
});



module.exports = mongoose.model('Century' , centurySchema);
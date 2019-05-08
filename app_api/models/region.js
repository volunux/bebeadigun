var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var regionSchema = new Schema({
																		'name' : {
																								'type' : String ,
																																		'maxlength' : 20,
																																												'required' : true,
																																																						'minlength' : 1,
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

module.exports = mongoose.model('Region' , regionSchema);
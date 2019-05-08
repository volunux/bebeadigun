var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var continentSchema = new Schema({
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

continentSchema
						.virtual('url')
														.get(function () {
  																							return '/continent/' + this.continent;
				});

module.exports = mongoose.model('Continent' , continentSchema);
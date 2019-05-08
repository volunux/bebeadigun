var name = require('./name') , art = require('./art') , iname = require('./iname') , iart = require('./iart') , photo = require('./photo') , 

iphoto = require('./iphoto') ,  index = require('./index');

module.exports = (app) => {

	app.use('/'											,												index);
	app.use('/'											,												iname);	
	app.use('/'											,												iart);		
	app.use('/'											,												iphoto);	

	app.use('/art'									,												art);
	app.use('/name' 								, 											name);
	app.use('/photo'								,												photo);

}
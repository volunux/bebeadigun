var name = require('./name') ,  art = require('./art') , country = require('./country') , gender = require('./gender') , alphabet = require('./alphabet')  , baby = require('./baby') , eyon = require('./eyon') ,

specie = require('./specie') , century = require('./century') , region = require('./region') , photo = require('./photo') , genre = require('./genre') ,

continent = require('./continent');

module.exports = (app) => {

	app.use('/api'									,												alphabet);
	app.use('/api'									,												art);
	app.use('/api'									,												baby);
	app.use('/api'									,												century);	
	app.use('/api'									,												continent);	
	app.use('/api'									,												country);
	app.use('/api'									,												eyon);
	app.use('/api'									,												gender);
	app.use('/api'									,												genre);
	app.use('/api' 									, 											name);
	app.use('/api'									,												photo);
	app.use('/api'									,												region);
	app.use('/api'									,												specie);

}
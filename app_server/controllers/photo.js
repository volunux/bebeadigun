const { body, validationResult } = require('express-validator/check');

const { sanitizeBody } = require('express-validator/filter');

var Eyon = require('../../app_api/models/eyon') , Photo = require('../../app_api/models/photo') , eConfig = require('../config/eyon') , pConfig = require('../config/photo') , async = require('async') ,

axios = require('axios') , url = '' , data = '' , ethnic = '' , photo = '' , eyon = '' , pParam = '' , multer = require('multer') , upload = multer({ 'storage' : pConfig.multer });

module.exports = {

	'photos' : (req , res , next) => { url = String(eConfig.reqOptions.url);

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('photo/index' , { 'title': 'List of Photos by Ethnic Groups' , 'eyons' : data});				})
	} ,

	'photosAll' : (req , res , next) => { url = String(pConfig.reqOptions.url);

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('photo/list_photo' , { 'title': 'List of Photos' , 'photos' : data });				})
	} ,

	'photoEthnic' : (req , res , next) => { ethnic = req.params.ethnic , url = String(pConfig.reqOptions.url + 'ethnic/' + ethnic) , title = ethnic[0].toUpperCase() + ethnic.slice(1) + ' Photos';

			axios.get(url).then((response) => {	data = response.data.status;

																																				res.render('photo/list_photo' , { 'title' : title , 'photos' : data , 'ethnic' : ethnic.toLowerCase() });				})
	} ,	

	'photoCountry' : (req , res , next) => { country = req.params.country , url = String(pConfig.reqOptions.url + 'country/' + country) , title = country[0].toUpperCase() + country.slice(1) + ' Photos';

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('photo/list_photo' , { 'title' : title , 'photos' : data });				})
	} ,	

	'photoDetail' : (req , res , next) => { 	photo = req.params.photo , url = String(pConfig.reqOptions.url + photo);

			axios.get(url).then((response) => {	data = response.data.status , title = data.title;

																																				res.render('photo/photo_detail' , { 'title' : title , 'photo' : data});				})
									.catch((err) => {				status = err.response;
																																	res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} ,

	'photoAdd' : (req , res , next) => {	url = String(pConfig.reqOptions.url + 'add');	

			axios.get(url).then((response) => {	var data = response.data.status ,	eyon = data.Eyon ,	genre = data.Genre , country = data.Country ,

																					century = data.Century , continent = data.Continent , region = data.Region;
																					
																	res.render('forms/add_forms/photo_add' , { 'title': 'Add a new Photo'  , 'genre' : genre , 'eyon' : eyon , 'century' : century ,

																																							'country' : country , 'continent' : continent , 'region' : region});			})										
										.catch((err) => {				status = err.response;
																																			res.render('error' , {'title' : 'Error' , 'error' : status})																				});
	} , 

	'photoAddSubmit' :  [ 	

				upload.single('photo') ,

				body('title'									,		'Title must not be empty.')										.isLength({ min: 3 }).trim(),
				body('date'										,		'Date should be provided.')										.isLength({ min: 3 }).trim(),
				body('century'								,		'Century should be provided.')								.isLength({ min: 3 }).trim(),
				body('genre'									,		'Category should be provided.')								.isLength({ min: 3 }).trim(),
				body('country'								,		'Country should be provided.')								.isLength({ min: 3 }).trim(),
				body('continent'							,		'Continent should be provided.')							.isLength({ min: 3 }).trim(),
				body('ethnic_group'						, 	'Ethnic Group must be provided.')							.isLength({ min: 3 }).trim(),
				body('about'									, 	'About photo content must be provided.')			.isLength({ min: 3 }).trim(),

				sanitizeBody('*').trim(),

				pConfig.validate ,
				
				(req , res , next) => {	if (req.file) {	req.body.photo_detail = req.file; }

					var photo = new Photo(req.body);

				const errors = validationResult(req);

				var errArr = errors.array();
																			if (req.body.error) {		errArr.push(req.body.error);		}

																			if (req.body.error2) {	errArr.push(req.body.error2);		}

								if (errArr.length !=- 0) {		url = String(pConfig.reqOptions.url + 'add');

											axios.get(url).then((response) => { var	data = response.data.status ,	eyon = data.Eyon ,	genre = data.Genre , country = data.Country ,

																															century = data.Century , continent = data.Continent , region = data.Region;
																					
																	res.render('forms/add_forms/photo_add' , { 'title': 'Add a new Photo'  , 'genre' : genre , 'eyon' : eyon ,	'century' : century , 'region' : region ,

																																						 'country' : country , 'continent' : continent , 'photo' : photo , 'errors' : errArr		});					
																	});		}
        							else {

															axios({  	'method': 'post' ,
																											  		'url' : pConfig.reqOptions.url ,
															  															 																'data' : req.body 	})
																			.then((response) => {		
																																										res.redirect('/');		})
																			.catch((err) => {			
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status});		});
        														}																																																	
	}], 

	'photoUpdate' : (req , res , next) => {	photo = req.params.photo , url = String(pConfig.reqOptions.url + photo + '/update');

		axios.get(url).then((response) => {	var data = response.data.status ,	eyon = data.Eyon ,	genre = data.Genre , country = data.Country ,

																					century = data.Century , continent = data.Continent , region = data.Region , photo = data.Photo;

																					res.render('forms/add_forms/photo_add' , { 'title': 'Update a Photo' , 'genre' : genre , 'eyon' : eyon , 'century' : century ,

																																							'country' : country , 'continent' : continent , 'region' : region , 'photo' : photo });	})
										
									.catch((err) => {				status = err.response;
																																	res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'photoUpdateSubmit' : [

				upload.single('photo') ,

				body('title'									,		'Title must not be empty.')										.isLength({ min: 3 }).trim(),
				body('date'										,		'Date should be provided.')										.isLength({ min: 3 }).trim(),
				body('century'								,		'Century should be provided.')								.isLength({ min: 3 }).trim(),
				body('genre'									,		'Category should be provided.')								.isLength({ min: 3 }).trim(),
				body('country'								,		'Country should be provided.')								.isLength({ min: 3 }).trim(),
				body('continent'							,		'Continent should be provided.')							.isLength({ min: 3 }).trim(),
				body('ethnic_group'						, 	'Ethnic Group must be provided.')							.isLength({ min: 1 }).trim(),
				body('about'									, 	'About photo content must be provided.')			.isLength({ min: 1 }).trim(),

				pConfig.validate ,

				sanitizeBody('*').trim() ,
				
				(req , res , next) => {	if (req.file) {	req.body.photo_detail = req.file; }

					pParam = req.params.photo;

					var photo = new Photo(req.body);

				const errors = validationResult(req);

				var errArr = errors.array();
																			if (req.body.error) {		errArr.push(req.body.error);		}

																			if (req.body.error2) {	errArr.push(req.body.error2);		}

								if (errArr.length !== 0) {		url = String(pConfig.reqOptions.url + 'add');

											axios.get(url).then((response) => { var	data = response.data.status ,	eyon = data.Eyon ,	genre = data.Genre , country = data.Country ,

																															century = data.Century , continent = data.Continent , region = data.Region;
																					
																	res.render('forms/add_forms/photo_add' , { 'title': 'Update Photo'  , 'genre' : genre , 'eyon' : eyon ,	'century' : century , 'region' : region ,

																																						 'country' : country , 'continent' : continent , 'photo' : photo , 'errors' : errArr		});					
																	});		}
        							else {
															axios({  	'method': 'put' ,
																												  'url' : pConfig.reqOptions.url + pParam , 
																								  																 									'data' : req.body 	})
															.then((response) => {		
																																										res.redirect('/photo/');		})
															.catch((err) => {			status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status});		});
        														}
        		}]		
	 , 

	'photoDelete' : (req , res , next) => {	photo = req.params.photo , url = String(pConfig.reqOptions.url + 'photo/' + photo);
		
		axios.get(url).then((response) => { 	data = response.data.status;
																																				if (!data) {
																																												return;		}
																																						else {
																																										res.render('forms/delete_forms/photo_delete' , {'title' : 'Remove Name' , 'photo' : data});
																																																																																											}})
									.catch((err) => {				status = err.response;
																																					res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'photoDeleteSubmit' : (req , res , next) => {	photo = req.params.photo;

			axios({  	'method': 'delete' ,
																		  'url' : pConfig.reqOptions.url + photo})
			.then((response) => {		
																														res.redirect('/photo/');		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status});																										});
	} ,


	'photoVote' : (req , res , next) => {	photo = req.params.photo;

			axios({  	'method': 'post' ,
																		'url' : pConfig.reqOptions.url + photo + '/vote' })
			.then((response) => {		
																														console.log(response.data)		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status});																										});
	}

}
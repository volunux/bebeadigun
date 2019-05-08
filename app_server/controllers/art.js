const { body, validationResult } = require('express-validator/check');

const { sanitizeBody } = require('express-validator/filter');

var Eyon = require('../../app_api/models/eyon') , Art = require('../../app_api/models/art') , eConfig = require('../config/eyon') , aConfig = require('../config/art') , async = require('async') ,

axios = require('axios') , url = '' , data = '' , ethnic = '' , art = '' , eyon = '' , aParam = '' , pConfig = require('../config/photo') , multer = require('multer') , 

upload = multer({ 'storage' : pConfig.multer });

module.exports = {

	'arts' : (req , res , next) => { url = String(eConfig.reqOptions.url);

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('art/index' , { 'title': 'List of Arts by Ethnic Groups' , 'eyons' : data});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status})																				});
	} ,

	'artEthnic' : (req , res , next) => { ethnic = req.params.ethnic , url = String(aConfig.reqOptions.url + 'ethnic/' + ethnic) , title = ethnic[0].toUpperCase() + ethnic.slice(1) + ' Arts';

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('art/list_art' , { 'title' : title , 'arts' : data , 'ethnic' : ethnic.toLowerCase() });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status})												});
	} ,	

	'artDetail' : (req , res , next) => { 	art = req.params.art , url = String(aConfig.reqOptions.url + art);

			axios.get(url).then((response) => {	data = response.data.status , title = data.title;
																																															res.render('art/art_detail' , { 'title' : title , 'art' : data});				})
										.catch((err) => {				status = err.response;
																																															res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} ,

	'artAdd' : (req , res , next) => {	url = String(aConfig.reqOptions.url + 'add');	

			axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

																																															res.render('forms/add_forms/art_add' , { 'title': 'Add a new Art'  , 'eyon' : eyon , 'countries' : country });		})
										.catch((err) => {				status = err.response;
																																															res.render('error' , {'title' : 'Error' , 'error' : status})																				});
	} , 

	'artAddSubmit' :  [ 

				upload.single('photo') ,

				body('title'								,		'Title must not be empty.')													.isLength({ min: 3 }).trim(),				
				body('ethnic_group'					, 	'Ethnic Group must be provided.')										.isLength({ min: 1 }).trim(),
				body('art_body'							, 	'Art body content must be provided.')								.isLength({ min: 1 }).trim(),

				pConfig.validate ,

				(req , res , next) => {	if (req.file) {	req.body.photo_detail = req.file; }

					var art = new Art(req.body);

				const errors = validationResult(req);

				var errArr = errors.array();
																			if (req.body.error) {		errArr.push(req.body.error);		}

								if (errArr.length !== 0) {
																						res.render('forms/add_forms/art_add' , {'title' : 'Add a Art',	'art' : art , 'errors' : errArr			});				}
        							else {

															axios({  	'method': 'post' ,
																											  		'url' : aConfig.reqOptions.url ,
															  															 																'data' : req.body 	})
																			.then((response) => {		
																																										res.redirect('/');		})
																			.catch((err) => {			
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status});		});
        														}																																																	
	}], 

	'artUpdate' : (req , res , next) => {	art = req.params.art , url = String(aConfig.reqOptions.url + art + '/update');

		axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , art = data.Art , country = data.Country;

																					res.render('forms/add_forms/art_add' , { 'title': 'Update a Art'  , 'eyon' : eyon , 'art' : art , 'countries' : country });	})
										
									.catch((err) => {				status = err.response;
																																	res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'artUpdateSubmit' : [

				upload.single('photo') ,

				body('title'									,		'Title must not be empty.')										.isLength({ min: 3 }).trim(),
				body('ethnic_group'						, 	'Ethnic Group must be provided.')							.isLength({ min: 1 }).trim(),
				body('art_body'								, 	'Art body content must be provided.')					.isLength({ min: 1 }).trim(),	


				sanitizeBody('*').trim(),

				pConfig.validate ,
				
				(req , res , next) => {	if (req.file) {	req.body.photo_detail = req.file; }

					aParam = req.params.art;

					var art = new Art(req.body);

				const errors = validationResult(req);

				var errArr = errors.array();
																			if (req.body.error) {		errArr.push(req.body.error);		}

								if (errArr.length !== 0) {		url = String(aConfig.reqOptions.url + 'add');

											axios.get(url).then((response) => { var	data = response.data.status ,	eyon = data.Eyon , country = data.Country;
																					
																	res.render('forms/add_forms/art_add' , { 'title': 'Update a Art'  , 'eyon' : eyon , 'country' : country , 'art' : art , 'errors' : errArr		});		});		}
        							else {
															axios({  	'method': 'put' ,
																												  'url' : aConfig.reqOptions.url + aParam , 
																								  																 									'data' : req.body 	})
															.then((response) => {		
																																										res.redirect('/art/');		})
															.catch((err) => {			status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status});		});
        														}
        		}]		
	 , 

	'artDelete' : (req , res , next) => {	art = req.params.art , url = String(aConfig.reqOptions.url + 'art/' + art);
		
		axios.get(url).then((response) => { 	data = response.data.status;
																																				if (!data) {
																																												return;		}
																																						else {
																																										res.render('forms/delete_forms/art_delete' , {'title' : 'Remove Name' , 'art' : data});					}})
									.catch((err) => {				status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'artDeleteSubmit' : (req , res , next) => {	art = req.params.art;

			axios({  	'method': 'delete' ,
																		  'url' : aConfig.reqOptions.url + art})
			.then((response) => {		
																														res.redirect('/art/');		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status});																										});
	}

}
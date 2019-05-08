var multer = require('multer') , fs = require('fs') , path = require('path') , request = require('request') , imageMagic = require('./photomagic.js') , $filename = require('./filename');

module.exports = {

		'reqOptions' : {		'url' : 'http://evening-garden-47445.herokuapp.com/api/image/' ,
																																				'method' : 'GET' ,
																																														'json' : {} ,
																																																					'qs' : {}			} ,

		'multer' :  multer.diskStorage({
	 																		'destination' : function (req, file, cb) {
																																									var photoPath = String('./public/photos/');
																																																																cb(null, photoPath);		
																												  } ,

								'filename' : function (req , file , cb) {
																													fileName = $filename(file);
	    																																									cb(null, fileName)			}
	  		}) ,

		'validate' : (req , res , next) => {	if (req.file) {

			var bitmap = fs.readFileSync('./public/photos/' + req.file.filename).toString('hex' , 0 , 4);

				if (!imageMagic.checkMagic(bitmap)) {
																					
							fs.unlinkSync('./public/photos/' + req.file.filename);
																																			req.body.error = {
																																													'location' : 'body' ,
																																																								'param' : 'photo' ,
																																																																		'value' : '' ,
																																																																										'msg' : 'Only Image files Allowed'		}	}  }

					if (!req.file) {
														req.body.error2 = {
																								'location' : 'body' ,
																																			'param' : 'photo' ,
																																													'value' : '' ,
																																																					'msg' : 'Image Must be provided'		}	}
																next(); 		}
}
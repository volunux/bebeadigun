var express = require('express') , router = express.Router() , art = require('../controllers/art') , dummy = require('../../app_server/controllers/dummy');

router.get('/arts'																				,														art.arts);


router.get('/arts/okan/:art'															,														art.artName);
	
router.post('/arts'																			,														art.artAddSubmit);



router.get('/arts/add'																		,														art.artAdd);

router.get('/arts/:art/update'														,														art.artUpdate);
	




router.get('/arts/ethnic/:ethnic/'												,														art.artEthnic);



router.get('/arts/:art/'																	,														art.artDetail);

router.put('/arts/:art'																	,														art.artUpdateSubmit);
	
router.delete('/arts/:art'																,														art.artDelete);



//router.get('/arts/:ethnic/alphabet/'										,														arts.artsByAlphabet);


module.exports = router;
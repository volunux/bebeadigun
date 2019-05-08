var express = require('express') , router = express.Router() , art = require('../controllers/art') , dummy = require('../controllers/dummy');


router.get('/'																						,															art.arts);



router.get('/add'																					,															art.artAdd);

router.post('/add'																				,															art.artAddSubmit);



router.get('/:art'																			,															art.artDetail);




router.get('/:art/update'																	,														art.artUpdate);

router.post('/:art/update'																,														art.artUpdateSubmit);



router.get('/:art/delete'																	,														art.artDelete);
	
router.post('/:art/delete'																,														art.artDeleteSubmit);



module.exports = router;
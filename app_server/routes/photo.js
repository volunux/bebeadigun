var express = require('express') , router = express.Router() , photo = require('../controllers/photo') , dummy = require('../controllers/dummy');


router.get('/'																						,															photo.photosAll);

router.get('/list' 																				,															photo.photos)


router.get('/add'																					,															photo.photoAdd);

router.post('/add'																				,															photo.photoAddSubmit);



router.get('/:photo'																			,															photo.photoDetail);




router.get('/:photo/update'																,														photo.photoUpdate);

router.post('/:photo/update'															,														photo.photoUpdateSubmit);




router.get('/:photo/delete'																,														photo.photoDelete);
	
router.post('/:photo/delete'															,														photo.photoDeleteSubmit);



module.exports = router;
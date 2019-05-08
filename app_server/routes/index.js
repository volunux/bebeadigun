var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/form' , (req , res , next) => {

																						res.render('forms/add_forms/forms')
})

router.get('/textform' , (req , res , next) => {

																						res.render('forms/add_forms/text_form')
})


router.post('/textform' , (req , res , next) => {

																												console.log(req.body);
})

module.exports = router;

let express = require('express');

let router = express.Router();

router.route('/')
	.get(function(req,res,next){

		return res.render('./visitor/index');
	
	});



module.exports = router;
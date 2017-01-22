let express = require('express');
let apiRouteFunctions = require('./routeFunctions/adminRouteFunctions.js');

let router = express.Router();

router.route('/employees')
	.get(apiRouteFunctions.getEmployees);





module.exports = router;
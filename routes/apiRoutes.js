let express = require('express');
let apiRouteFunctions = require('./routeFunctions/apiRouteFunctions.js');

let router = express.Router();

router.route('/employees')
	.get(apiRouteFunctions.getEmployees);

router.route('/register/employee')
	.post(apiRouteFunctions.registerEmployee);

router.route('/register/employer')
	.post(apiRouteFunctions.registerEmployer);

router.route('/logIn')
	.post(apiRouteFunctions.localLogIn);



module.exports = router;
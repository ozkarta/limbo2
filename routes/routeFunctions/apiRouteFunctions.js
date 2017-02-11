let jobCategory = require('../../db/dbModules').jobCategoryModel;
let jobPost = require('../../db/dbModules').jobModel;
let User = require('../../db/dbModules').userModel;


module.exports.getEmployees = function(req,res,next){
	User.find({userRole:'employee'}, (err,result) =>{
		if (err){
			return  next(err);
		}
		return res.json(result);
	});
};


module.exports.registerEmployee = function(req, res, next){
	console.log('Employee  registration was  confirmed');

	console.dir(req.body);
	User.findOne({userName:req.body.employee.userName}, findWithUserNameCallback);



	function findWithUserNameCallback(err,result){
		if(err){
			return res.send({status:500,message:'Internal Server Error'});
		}

		if(result){
			return res.send({status:400,message:'User Allready Exists'});
		}

		let newEmployee = new User();

		newEmployee.userName = req.body.employee.userName;
		newEmployee.fName = req.body.employee.fName || req.body.employee.directorFName;
		newEmployee.lName = req.body.employee.lName || req.body.employee.directorLName;
		newEmployee.email = req.body.employee.eMail
		newEmployee.passwordTrial = req.body.employee.password;
		newEmployee.employeeType = req.body.employee.employeeType;
		newEmployee.businessName = req.body.employee.businessName;
		newEmployee.controlNumber = req.body.employee.controlNumber;
		newEmployee.businessType = req.body.employee.businessType;
		newEmployee.principalOfficeAddress = req.body.employee.principalOfficeAddress;
		newEmployee.registrationDate = req.body.employee.registrationDate;  // Company Registration
		//newEmployee.fName = req.body.employee.directorFName;
		//newEmployee.lName = req.body.employee.directorLName;
		newEmployee.userRole = req.body.employee.userRole;

		newEmployee.save(afterSaveCallback);
	}
	function afterSaveCallback(err,savedUser){
		//console.dir(savedUser);
		if(err){
			return res.send({status:500,message:'Internal Server Error'});
		}

		if(savedUser){
			return res.send({status:200,message:'User Saved'});
		}else{
			return res.send({status:500,message:'User Could Not Be Saved'});
		}

	}
}

module.exports.registerEmployer = function(req, res, next){
	console.log('it is here ');
	console.log('sending status OK');

	console.dir(req.body);

	User.findOne({userName:req.body.employer.userName}, findWithUserNameCallback);


	//_____________________CALLBACKS______________________
	function findWithUserNameCallback(err,result){
		if(err){
			return res.send({status:500,message:'Internal Server Error'});
		}

		if(result){
			return res.send({status:400,message:'User Allready Exists'});
		}

		let newEmployer = new User();
		
		newEmployer.userName = req.body.employer.userName;
		newEmployer.fName = req.body.employer.fName;
		newEmployer.lName = req.body.employer.lName;
		newEmployer.email = req.body.employer.eMail;
		newEmployer.passwordTrial = req.body.employer.password;
		newEmployer.userRole = req.body.employer.userRole;

		newEmployer.save(afterSaveCallback);
	}

	function afterSaveCallback(err,savedUser){
			//console.dir(savedUser);
			if(err){
				return res.send({status:500,message:'Internal Server Error'});
			}

			if(savedUser){
				return res.send({status:200,message:'User Saved'});
			}else{
				return res.send({status:500,message:'User Could Not Be Saved'});
			}

		}

    //res.send({status:'everything is OK'});
}

module.exports.localLogIn = function(req,res,next){
	console.dir(req.body);

	if ( req.body ){
		
		if ( !req.body.userName ){
			return res.send({status:400,message:'UserName  not valid'});
		}

		if ( !req.body.password ){
			return res.send({status:400,message:'Password not valid'});
		}

		User.findOne({userName:req.body.userName,passwordTrial:req.body.password}, function userFoundCallback(err,user){
			if(err){
				return res.send({status:500,message:'Internal Server Error'});
			}

			if(user){
				return res.send({status:200,user:user});
			}else{
				return res.send({status:400,message:'User was not found'});
			}
		})

	}else{
		return res.send({status:400,message:'body not valid'});
	}
	


}
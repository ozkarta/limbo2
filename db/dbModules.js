let mongoose = require('mongoose');

let Schema = mongoose.Schema;


//   Schemas
let userSchema = new Schema({
		// General Fields
		userGUID				:String,
		effDate					:String,
		lastVisited				:String,
		authenticationMethod   	:String,            //Local, FB  , google ........
		emailConfirmed			:String,
		active					:String,

			//  Employee Fields
			whoAmI   				:String,           //Company or individual

			businessName			:String,
		    controlNumber			:String,
		    businessType			:String,
		    principalOfficeAddress	:String,
		    registrationDate		:String,			//  Company Registration Date 

		    aboutCompany			:String,
		    mission					:String,
		    vission					:String,

		    services				:[],
		    portfolio				:[],

		//  General Fields
		userName				:String,
		email 					:String,
		contactPhone			:String,
		fName					:String,
		lName					:String,

		

		//contact information

		contactAddress			:String,
		contactEmail			:String,
		contactPhoneNumber		:String,

		passwordHash			:String,
		passwordTrial			:String,
		hash 					:String,
		passwordResetGUID		:String,		//  is generated when  new RESET  is requested  ,  destroy after that
		passwordHistory			:[],			//  effdate, passwordHash,hash,  

		userRole				:String,

		subscribers			    :[{type: Schema.Types.ObjectId, ref: 'User'}],

		subscribes 		    	:[{type: Schema.Types.ObjectId, ref: 'User'}],

		feadback				:[],

		// employe Specific
			postedJobs			:[{type: Schema.Types.ObjectId, ref: 'Jobs'}]
},{
    timestamps: true
});

let jobSchema = new Schema({
		jobGUID				:String,
		createDate			:String,
		effDate				:String,

		ownerGUID			:String,
		owner 				:{type: Schema.Types.ObjectId, ref: 'User'},
		jobCategoryGUID		:String,
		jobCategory 		:{type: Schema.Types.ObjectId, ref: 'JobCategory'},
		jobSubCategoryGUID  :String,
		jobSubCategory      :[{type: Schema.Types.ObjectId, ref: 'JobCategory'}],

		jobTitle			:String,
		jobDescription		:String,
		deadLine			:String,
		budget				:String,

		paymentType			:String,		//fixed  or  hourly
		projectType			:String,		//  ongoing   or   one-time

		status				:String,		//active ,finished , inProggress, cancelled, moderation,


		requirements		:[],
		candidates			:[{type: Schema.Types.ObjectId, ref: 'User'}],
		imageURLList		:[],
		atachmentList		:[]
},{
    timestamps: true
});

let jobCategorySchema = new Schema({
		categoryGUID			:String,
		//categorySystemName		:String,   //  kategoriis  saxeli  sistemuri
		categoryVarName			:String,    //  gadasatargmnad
		type 					:String,
		subCategory				:[{type: Schema.Types.ObjectId, ref: 'JobCategory'}]
},{
    timestamps: true
});

let jobStatusSchema = new Schema({

},{
    timestamps: true
});

let offersSchema = new Schema({

},{
    timestamps: true
});

let proposalSchema = new Schema({

},{
    timestamps: true
});



module.exports.userModel = mongoose.model( 'User', userSchema);

module.exports.jobModel = mongoose.model( 'Jobs', jobSchema);

module.exports.jobCategoryModel = mongoose.model( 'JobCategory', jobCategorySchema);



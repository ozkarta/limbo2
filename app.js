//  Global
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let expressLayouts = require('express-ejs-layouts');
let path = require('path');

//   Locals
let config = require('./config/appConfig.js');
let logger = require('./classes/logger.js');
let errorHandlers = require('./classes/errorHandlers.js');
//  Require Routers
let defaultRouter = require('./routes/defaultRoutes.js');
let adminRouter = require('./routes/adminRoutes.js');
let apiRouter = require('./routes/apiRoutes.js');
let employeeRouter = require('./routes/employeeRoutes.js');
let employerRouter = require('./routes/employerRoutes.js');
let visitorRouter = require('./routes/visitorRoutes.js');


let initDB = require('./classes/initDB');
//  App
let app = express();

app.set('view engine', 'ejs');
app.use(expressLayouts);

//  BodyParser Middleware
app.use(express.static(path.join(__dirname, 'angular/dist')));
app.use('/public',express.static(path.join(__dirname, 'angular/src/public')));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//  Use Custom routes 
//app.use(defaultRouter);


// Set Layouts
app.use('/admin', (req,res,next) =>{
	req.app.set('layout', '../views/layouts/adminLayout');
	return next();
});

// app.use('/api', (req,res,next) =>{
// 	req.app.set('layout', './views/layouts/adminLayout');
// 	return next();
// });

app.use('/employee', (req,res,next) =>{
	req.app.set('layout', '../views/layouts/employeeLayout');
	return next();
});
app.use('/employer', (req,res,next) =>{
	req.app.set('layout', '../views/layouts/employerLayout');
	return next();
});
app.use('/visitor', (req,res,next) =>{
	req.app.set('layout', '../views/layouts/visitorLayout');
	return next();
});


//  Enable cors For  API functions
app.use('/api', function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

//  Main Routes

app.use('/admin', adminRouter);
app.use('/api', apiRouter);
app.use('/employee', employeeRouter);
app.use('/employer', employerRouter);
app.use('/visitor', visitorRouter);

//
app.use('*', visitorRouter);


app.use('*',errorHandlers.urlNotFoundHandler);


// Detault Error Logger to the file
app.use(logger.errorLogger);

// Error Handlers

app.use('/admin', errorHandlers.adminErrorHandler);
app.use('/api', errorHandlers.apiErrorHandler);
app.use('/employee', errorHandlers.employeeErrorHandler);
app.use('/employer', errorHandlers.employerErrorHandler);
app.use('/visitor', errorHandlers.visitorErrorHandler);



//  mongoose connection
mongoose.connect(config.dbURL);

let port = config.port || process.env.port;

let server = app.listen(port, () =>{
	console.log('Limbo app is listening to ... ' +port);

	initDB.initDatabase();
});
let jobCategory = require('../db/dbModules').jobCategoryModel;
let jobPost = require('../db/dbModules').jobModel;
let User = require('../db/dbModules').userModel;
let Conversation = require('../db/dbModules').conversationModel;
let Message = require('../db/dbModules').messageModel;




module.exports.webSocketHandler = function (ws){
	console.log('Client connected');
	ws.send(JSON.stringify({conversation:{},type:'handshake',status:200,message:'hello client'}));

	ws.on('message',function incomming(messageString){
		console.log('message received ....');
		console.dir(messageString);

		let message = JSON.parse(messageString);
		console.dir(message);

		//  Request Actions
		if (message.requestAction === 'getConversationList'){
			Conversation.find({chatters:message.me._id}, (err, conversation) => {
				if(!err){
					ws.send(JSON.stringify({conversation:conversation,type:'create',status:'200',message:''}));
				}				
			});
		}

	});

	// ws.on('close', function close(message){
	// 	console.log('closed');
	// });

	// ws.on('open', function open(message){
	// 	console.log('open');
	// });

}
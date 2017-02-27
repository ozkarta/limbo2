import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebSocketService } from './web-socket.service';

import { Conversation } from '../models/conversation.model';
import { ConversationUser } from '../models/conversation-user.model';
import { Message } from '../models/message.model';




@Injectable()
export class ChatService {
    public ws: Subject<Conversation>;
    private messengerURL = 'ws://localhost:3311';
    private result: string;
    private request: Conversation;
    private me: ConversationUser;
    public conversation: Conversation[];


    constructor(private weService: WebSocketService) {

        this.conversation = [];
        this.request = {
                id: '',
                me: null,
                chatters: [],
                subject: '',
                messages: [],
                lastResponseType: '',
                requestAction:''
            };
        this.me = new ConversationUser();
        
        this.ws = <Subject<Conversation>>this.weService.connect(this.messengerURL)
            .map((response: MessageEvent): Conversation => {
                let data = JSON.parse(response.data);
                console.log('data received');
                console.dir(data);
                //  create message object array  from response
                let messageArray: Message[] = []
                if (data.conversation.messages) {
                    for (let message of data.conversation.messages) {
                        let m: Message = new Message();
                        messageArray.push(m);
                    }
                }
                //  create chatters object array from response
                let chatterArray: ConversationUser[] = [];
                if (data.conversation.chatters) {
                    for (let chatter of data.conversation.chatters) {
                        let c: ConversationUser = new ConversationUser();
                        chatterArray.push(c);
                    }
                }

                this.initializeMe();

                return {
                    id: data.conversation.conversationID,
                    me: this.me,
                    chatters: chatterArray,
                    subject: data.conversation.subject,
                    messages: messageArray,
                    lastResponseType: data.type,
                    requestAction:''
                }
            });




        this.ws.subscribe(conversation => {

            if (conversation.lastResponseType === 'handshake') {
                console.log('server responded with handshake');
                this.initializeMe();

                this.request.me = this.me;
                this.request.requestAction='getConversationList';

                this.ws.next(this.request);
            } else {
                let conversationExists = false;
                // Check if conversation ID exists  on client side
                for (let con of this.conversation) {
                    if (con.id === conversation.id) {
                        console.log('conversation exists!!!')
                        conversationExists = true;
                        // if exists .....
                        if (conversation.lastResponseType === 'append') {
                            // append message
                            for (let message of conversation.messages) {
                                con.messages.push(message);
                            }

                            // update chat users
                            con.chatters = conversation.chatters;

                            // update chat subject
                            con.subject = conversation.subject;

                            // Update last response type
                            con.lastResponseType = conversation.lastResponseType;
                        }

                    }
                }
                //  If conversation does not exist   add one
                if (!conversationExists) {
                    this.conversation.push(conversation);
                }

                console.dir(this.conversation);
            }

        });




    }

    private initializeMe(){
        let user = JSON.parse(localStorage.getItem('currentUser'));
        if (user){
            this.me.fName = user.fName;
            this.me.lName = user.lName;
            this.me.id = user._id;
            this.me.status = '';
        }else{
            // Router.redirect
        }      
    }



}


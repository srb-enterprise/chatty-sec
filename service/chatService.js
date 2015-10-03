var Chat = require('../models/chat');
var ChatRoom = require('../models/chatRoom');


module.exports = {

  save: function (chat, done) {
        var newChat = new Chat();
        newChat.username = chat.username;
        newChat.message = chat.message;
        newChat.readByRecipient = true;
        newChat.room = 'chat.room';
        // save the user
        console.log("Before save ", newChat, chat);
        newChat.save(function(err) {
            if (err){
                console.log('Error in Saving chat: '+err);
                throw err;
            }
            console.log('save the succesful', newChat);
            return done(null, newChat);
        });
  },
  unreadMessages: function (user, done) {

  }
};

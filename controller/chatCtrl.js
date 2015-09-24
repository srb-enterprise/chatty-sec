var Chat = require('../models/chat');

var save = function (chat, done) {
      var newChat = new Chat();
      newChat.username = chat.username;
      newChat.message = chat.message;
      newChat.readByRecipient = chat.readByRecipient;
      newChat.room = chat.room;
      // save the user
      newChat.save(function(err, newChat) {
          if (err){
              console.log('Error in Saving chat: '+err);
              throw err;
          }
          // console.log('save the succesful', newChat);
          return done(null, newChat);
      });
};

var unreadMessages = function (chat, done) {
      
};

module.exports = function(io){

  /**
    A new connection is made for chat
  */
  io.on('connection', function(socket){
    console.log('a user connected');

    /*Giving room to new user*/
    socket.on('join_room', function (roomname){
      console.log("join room ", roomname);
      socket.join(roomname);
    });
    socket.on('leave_room', function (){
      console.log("left room ", roomname);
    })
    socket.on('chat message', function(msg){
      var chat = {msg: msg, readByRecipient: false, sender: socket.id, reciever: null, room: socket.roomname}
      save(chat, function (err, savedChat) {
        chat = savedChat;
      });
      io.emit('chat message', chat);
    });
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });
};

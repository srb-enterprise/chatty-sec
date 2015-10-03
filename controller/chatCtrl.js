var Chat = require('../models/chat');
var chatService = require('../service/chatService');

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

var unreadMessages = function (user, done) {

};
// usernames which are currently connected to the chat
var usernames = {};
var numUsers = 0;
module.exports = function(io){

  /**
    A new connection is made for chat
  */
  io.on('connection', function(socket){

    console.log('a user connected: ', socket.id);
    var username  = "Annonymus";
    /*Giving room to new user*/
    socket.on('join_room', function (data){
      console.log("join_room ", data.name);
      username=data.name;
      socket.join(data.name);
    });
    socket.on('leave_room', function (){
      console.log("left_room ", roomname);
    });

    socket.on('chat_message', function(msg){
      var chat = {message: msg, readByRecipient: false, sender: username, reciever: null, room: socket.roomname}
      chatService.save(chat, function (err, savedChat) {
        chat = savedChat;
      });
      io.emit('chat_message', chat);
    });

    var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new_message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new_message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add_user', function (username) {
    // we store the username in the socket session for this client
    socket.username = username;
    // add the client's username to the global list
    usernames[username] = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user_joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop_typing', function () {
    socket.broadcast.emit('stop_typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    // remove the username from global usernames list
    if (addedUser) {
      delete usernames[socket.username];
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user_left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
  });
};

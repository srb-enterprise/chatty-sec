module.exports = function(io){
  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('join_room', function (roomname){
      console.log("join room ", roomname);
      socket.join(roomname);
    });
    socket.on('leave_room', function (){

    })
    socket.on('chat message', function(msg){
       io.emit('chat message', {msg: msg, read: false, sender: socket.id});
    });
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });
};

$(function () {
  var socket = io();
  socket.emit("join_room", 'kishor');
  $('#send').on('click', function(){
    sendMesg ();
  });
  $('#inputMsg').on('keyup', function(e){
      if(e.keyCode == 13)
      {
        sendMesg ();
      }
  });
  function sendMesg () {
    socket.emit('chat message', $('#inputMsg').val());
    $('#inputMsg').val('');
  };
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg.sender+': '+msg.msg));
  });
});

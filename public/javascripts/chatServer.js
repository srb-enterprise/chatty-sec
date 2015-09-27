$(function () {
  $('.inputSec').hide();
  $('#joinRoom').on('click', function () {
    $('.inputSec').show();
    $('.nameSec').hide();
  });

  var socket = io();
  $('#joinRoom').on('click', function () {
      var name = $('#username').val();
      socket.emit("join_room", {name: name, user: user});
  });

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

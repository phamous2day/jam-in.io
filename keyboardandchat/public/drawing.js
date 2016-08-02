var canvas = document.getElementById("canvas");
var serverSocket = io();



  // This is all the functionality for the chat, username included
  var username = prompt('Username:');

  var isTyping = false;
  var lastIsTyping = false;
  $('#m').keypress(function() {
    isTyping = true;
    setTimeout(function() {
      isTyping = false;
    }, 1000);
  });

  setInterval(function() {
    if (lastIsTyping !== isTyping) {
      if (isTyping) {
        serverSocket.emit('start-type', username);
      } else {
        serverSocket.emit('end-type', username);
      }
    }
    lastIsTyping = isTyping;
  }, 250);


  var start = document.getElementById('Start');
  start.addEventListener('click', function (){
    var secretWord = prompt('Enter your secret word');
    console.log(secretWord);
    serverSocket.emit('clientSecretWord', secretWord);


  });




  serverSocket.emit('client-join', username);
  $('form').submit(function(){
    var message = $('#m').val();
    var html =
    '<span class="handle">' + username + '</span> ' + message;
    $('#messages').append($('<li>').html(html));
    serverSocket.emit('message-to-server', {
      username: username,
      message: message,
    });
    $('#m').val('');
    return false;
  });
  serverSocket.on('Winner', function() {
    console.log("there was a winner");
    io.emit(alert('Game Over!!'));
  });



  serverSocket.on('message-to-client', function(msg){
    var message =
    '<span class="handle">' + msg.username + '</span> ' + msg.message;
    $('#messages').append($('<li>').html(message));

  });
  serverSocket.on('join', function(username) {
    $('#messages').append($('<li class="join">')
    .text(username + ' has joined.'));
  });
  serverSocket.on('leave', function(username) {
    $('#messages').append($('<li class="leave">')
    .text(username + ' has left.'));
  });
  $('#typing-indicator').hide();
  serverSocket.on('start-type', function(username) {
    $('#typing-indicator .username').text(username);
    $('#typing-indicator').show();
  });
  serverSocket.on('end-type', function(username) {
    $('#typing-indicator').hide();
  });

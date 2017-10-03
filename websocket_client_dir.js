// websocket_client
function websocket_client() {
  "use strict";
  window.WebSocket = window.WebSocket || window.MozWebSocket;
 
  var connection = new WebSocket('ws://192.168.1.179:1337');
  connection.onopen = function () {
    var x_value = document.getElementById("input").value;
    var obj = { Name:'set',x_value:x_value}
    
    var json = JSON.stringify(obj);
    console.log(json);
    connection.send(json);
  };

  connection.onerror = function (error) {
    content.html($('<p>', {
      text: 'Sorry, but there\'s some problem with your '
         + 'connection or the server is down.'
    }));
  };
      
  connection.onmessage = function (message) {

    try {
      // var json = JSON.parse(message.data);
      console.log('msg: ', message.data);//set done
    } catch (e) {
      console.log('Invalid JSON: ', message);
      return;
    }
  }
}
// websocket_client();
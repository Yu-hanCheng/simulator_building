"use strict";
// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'auto_car';
// Port where we'll run the websocket server
var webSocketsServerPort = 1337;
// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');
// var unixSocket = require("unix-socket");
// var tryList = [ "tmp/server.sock" ];
// var path = unixSocket.availableStream(tryList);
// //or 
// unixSocket.availableStream(tryList, function(path) {
 
// });

var net = require('net');
var path = '/tmp/server_child.sock';
var u_client = new net.Socket();
u_client.connect(path);


/**
 * Global variables
 */
// latest 100 messages
var history = [ ];
// list of currently connected clients (users)
var clients = [ ];
var position = [200,300];
/**
 * Helper function for escaping input strings
 */
function htmlEntities(str) {
  return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
var colors = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ];
/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
  // Not important for us. We're writing WebSocket server,
  // not HTTP server
});
server.listen(webSocketsServerPort, function() {
  console.log((new Date()) + " Server is listening on port "
      + webSocketsServerPort);
});
/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
  // WebSocket server is tied to a HTTP server. WebSocket
  // request is just an enhanced HTTP request. For more info 
  // http://tools.ietf.org/html/rfc6455#page-6
  httpServer: server
});
// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
  // console.log((new Date()) + ' Connection from origin '
      // + request.origin + '.');

  var connection = request.accept(null, request.origin); 
  // we need to know client index to remove them on 'close' event
  var index = clients.push(connection) - 1;
  var userName = false;
  var userColor = false;

  // user sent some message
  connection.on('message', function(message) {
    if (message.type === 'utf8') { // accept only text
    // first message sent by user is their name
      var msg = JSON.parse(message.utf8Data);
      console.log(msg);
      if (msg.Name === "car") {
        userName = msg.Name;
        userColor = colors.shift();
          console.log(' User is known as: ' + userName
                      + ' with ' + msg.F + ' x position');
          var backtocar = {Name:'des',msg:position[0]}
          var msg_tocar = JSON.stringify(backtocar);
          clients[index].sendUTF(msg_tocar); 
        
        // var u_sen = {Name:'sensor_value',msg_to_u:msg.x_value}
        // var u_json = JSON.stringify(u_sen);
        // u_client.write(u_json);

      } else if(msg.Name === "set"){ // log and broadcast the message
          position[0]=msg.br_msg;    
      }else if (msg.Name === "code") {
        var u_code = {Name:'code',msg_to_u:msg.br_msg};
        var u_code_json = JSON.stringify(u_code);
        u_client.write(u_code_json);//send to child
        var fs = require('fs');
        var the_code = JSON.stringify(msg.br_msg);
        fs.writeFile("newcode.c", msg.br_msg, function(err) {
          if(err) { return console.log(err); }
      });
      const { spawn } = require('child_process');
      const comp = spawn('gcc', ['newcode.c', '-o','newcode']);

      comp.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      const exec = spawn('./newcode');

      exec.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });
      });
      fs.writeFile("flag.txt", "1", function(err) {
          if(err) { return console.log(err); }
      });  
      }else if(msg.Name === "obtc"){
        //unix socket
        // var u_obj = {Name:'u_obtc',msg_to_u:msg.x_value}
        // var u_json = JSON.stringify(u_obj);
        
      }
    }
  });
  // user disconnected
  connection.on('close', function(connection) {
    if (userName !== false && userColor !== false) {
      // console.log((new Date()) + " Peer "
      //     + connection.remoteAddress + " disconnected.");
      clients.splice(index, 1);
      colors.push(userColor);
    }
  });
});




// another way 

// var http = require('http');
// var express = require('express');
// var app = express();
// var server = http.createServer(app);
// app.get('/',function(request, response){ //我們要處理URL為 "/" 的HTTP GET請求
//     response.end('你好！'); //作出回應
// });
// server.listen(8080,'127.0.0.1',function(){
//     console.log('HTTP伺服器在 http://127.0.0.1:8080/ 上運行');
// });

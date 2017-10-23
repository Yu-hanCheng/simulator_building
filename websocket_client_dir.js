// websocket_client
// var req_url = "file:///Users/sarahcheng/Documents/Master/GRA/Simulator/require.js";
// // document.body.appendChild(document.createElement("script")).src = url;
// function loadjscssfile(filename){
//   var fileref=document.createElement('script')
//   fileref.setAttribute("type","text/javascript")
//   fileref.setAttribute("src", filename)
// }
// loadjscssfile(req_url);
// loadScript("file:///Users/sarahcheng/Documents/Master/GRA/Simulator/require.js");
var fs = require('fs');
function websocket_client(type) {
  "use strict";
  window.WebSocket = window.WebSocket || window.MozWebSocket;
 
  var connection = new WebSocket('ws://192.168.1.179:1337');
  // var connection = new WebSocket('ws://192.168.0.115:1337');

  connection.onopen = function () {
    if (type==0) {
      var x_value = document.getElementById("input").value;
      var obj = { Name:'set',br_msg:x_value}
    }else if (type==1) {
      var input_code = document.getElementById("input_code").value;
      var obj = { Name:'code',br_msg:input_code}
      console.log(obj.br_msg);
      fs.writeFile("socket_client.c", "Hey there!", function(err) {
          if(err) { return console.log(err); }
          console.log("The file was saved!");
      }); 
      const { spawn } = require('child_process');
      const comp = spawn('gcc', ['socket_clientt.c', '-o','client']);

      comp.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      const exec = spawn('./client');

      exec.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });
      });
    }
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
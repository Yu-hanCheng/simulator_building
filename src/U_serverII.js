process.title = 'U_serverII.js';
var net = require('net');
var fs = require('fs');
var path = '/tmp/server_child.sock';
var webSocketsServerPort = 1337;
var webSocketServer = require('websocket').server;
var http = require('http');
var clients=[0,0,0,0,0];
// main
function init(){
  setInterval(IPC,300);
  websocket();
}

// *********** IPC with newcode ***************
function IPC(){
var u_client = new net.Socket();
u_client.connect(path);
u_client.on('data', (chunk) => { 
  console.log(chunk.toString()); 
});
u_client.on('error', function(err) {
  console.log("Error: " + err);
});
  var u_code_json = JSON.stringify(ultra_value);
  u_client.write(u_code_json);
  u_client.end();
  u_client.on('end', function(err) {
  console.log("Enddd: " + err);
});

}

//********** global var ************

//to_browser
var motor=
{Name:'motor_dir',msg:{direct:'right',angle:90}}
// direct=L_F, L_B,R_F, R_B,Forward,Backward,stop

//from_browser
var code
={Name:'code',msg:'txt'}
var ultra_value
={Name:'ultra_value',msg:[1,1,1]}//F,L,R
var des
={Name:'des',msg:[0,0]}//x,y

// to_child
var  ultra_value
={Name:'ultra_value',msg:[1,1,1]}

// from_child
var motor_c
={Name:'motor_c',msg:[0,0,0,0],period:0}// L_F, L_B,R_F, R_B, time

function Motor_to_Angle(){
  //
  if(motor_c.msg[0]=="HIGH"){
    if (motor_c.msg[1]=="HIGH") {
      if (motor_c.msg[2]=="HIGH" && motor_c.msg[3]=="LOW") {
        motor.direct="L_F";motor.angle=45;
      }else if(motor_c.msg[2]=="LOW" && motor_c.msg[3]=="HIGH") {
        motor.direct="L_B";motor.angle=45;
      } else{ //motor_c.msg[2]=="LOW" && motor_c.msg[3]=="HIGH"
        motor.direct="stop";
      }
    }else{ //motor_c.msg[1]=="LOW"
      if (motor_c.msg[2]=="HIGH" && motor_c.msg[3]=="LOW") {
        motor.direct="Forward";
      }else if(motor_c.msg[2]=="LOW" && motor_c.msg[3]=="HIGH") {
        motor.direct="R_F";motor.angle=90;
      } else{ //motor_c.msg[2]=="LOW" && motor_c.msg[3]=="HIGH"
        motor.direct="R_F";motor.angle=45;
      }
    }
  }else{ //motor_c.msg[0]=="LOW"
      if (motor_c.msg[1]=="HIGH") { //L_B
        if (motor_c.msg[2]=="HIGH" && motor_c.msg[3]=="LOW") {
          motor.direct="L_F";motor.angle=90;
        }else if(motor_c.msg[2]=="LOW" && motor_c.msg[3]=="HIGH") {
          motor.direct="Backward";motor.angle=0;
        } else{ //motor_c.msg[2]=="LOW" && motor_c.msg[3]=="HIGH"
          motor.direct="R_B";motor.angle=45;
        }
      }else{ //motor_c.msg[1]=="LOW"
        if (motor_c.msg[2]=="HIGH" && motor_c.msg[3]=="LOW") { //RF
          motor.direct="L_F";motor.angle=45;
        }else if(motor_c.msg[2]=="LOW" && motor_c.msg[3]=="HIGH") {
          motor.direct="L_F";motor.angle=45;
        } else{ //motor_c.msg[2]=="LOW" && motor_c.msg[3]=="HIGH"
          motor.direct="stop";motor.angle=0;
        }
      }
  }

}

// *********** websocket with browser ************

function websocket(){

var server = http.createServer(function(request, response) {
});
server.listen(webSocketsServerPort, function() {
  console.log((new Date()) + " Server is listening on port "
      + webSocketsServerPort);
});
var wsServer = new webSocketServer({
  httpServer: server
});
wsServer.on('request', function(request) {
  var connection = request.accept(null, request.origin); 
  var index = clients.push(connection) - 1;
  var userName = false;
  var userColor = false;
  var fs = require('fs');
  connection.on('message', function(message) {
    if (message.type === 'utf8') { // accept only text
      var data = JSON.parse(message.utf8Data);
      if (data.Name === "ultra_value") {
          ultra_value.msg=data.msg;
          var msg_tocar = JSON.stringify(motor);
          clients[index].sendUTF(msg_tocar);
          console.log("in server readmotor");
          console.log(msg_tocar); 
      } else if(data.Name === "des"){ // log and broadcast the message
          position[0]=data.msg;    
      }else if (data.Name === "code") {
        fs.writeFile("newcode.c", data.msg, function(err) {
          if(err) { return console.log("write file error"); }
      });
    const child = require('child_process').exec;
    // var cmdString = 'pkill -f newcode; gcc -g newcode.c IPCServer.c -o newcode; nice -n 39 ./newcode ;';
    var cmdString = 'pkill -f newcode; gcc -g newcode.c IPCServer.c -o newcode; pm2 start newcode ;';
    child(cmdString, (err, stdout, stderr) => {
      console.log(stdout);
    });
      }
    }//if (message.type === 'utf8')
  });
  // user disconnected
  connection.on('close', function(connection) {

    return console.log(connection);
  });
});
}
init();
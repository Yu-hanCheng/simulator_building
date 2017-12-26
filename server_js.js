process.title = 'server_js';
var net = require('net');
var fs = require('fs');
var path = '/tmp/server_child.sock';
var webSocketsServerPort = 1337;
var webSocketServer = require('websocket').server;
var http = require('http');


// *********** IPC with newcode ***************

fs.unlink(path, function () {
  var u_server= net.createServer(function(c) {

    console.log('u_serverconnected');
    c.on('data', (chunk) => { 
      console.log(chunk.toString());
     });
    c.write('I\'m u_server\r\n'); 
    c.write(u_json); //ultra_value, obj_pos

    // c.on('end', function() {
    //   console.log('u_serverdisconnected');
    // });

  });

  u_server.listen(path, function() {
    console.log('u_serverbound listen on %s', path);
  });
});

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
      var msg = JSON.parse(message.utf8Data);
      if (msg.Name === "ultra_value") {
          ultra_value.msg=data;
          var msg_tocar = JSON.stringify(motor);
          clients[index].sendUTF(msg_tocar);
          console.log("in server readmotor");
          console.log(msg_tocar); 
      } else if(msg.Name === "des"){ // log and broadcast the message
          position[0]=msg.br_msg;    
      }else if (msg.Name === "code") {
        fs.writeFile("newcode.c", msg.br_msg, function(err) {
          if(err) { return console.log("write file error"); }
      });
    const child = require('child_process').exec;
    var cmdString = 'pkill -f newcode; gcc newcode.c -o newcode; nice -n 39 ./newcode ;';
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

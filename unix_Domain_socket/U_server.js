//  function init(){
//  setInterval(get_pos,100);
// }
function algo(pos){
  console.log(pos.msg_to_u);
}
var net = require('net');
var fs = require('fs');
var path = '/tmp/server_child.sock';
fs.unlink(path, function () {
  var u_server= net.createServer(function(c) {
    console.log('u_serverconnected');
    c.on('end', function() {
      console.log('u_serverdisconnected');
    });
    c.on('data', (chunk) => { 
      // console.log(chunk);
      console.log(chunk.toString());
      var par = JSON.parse(chunk);
      if(par.Name==='code'){
        console.log(par.msg_to_u);
        // sysfork(par.msg_to_u);
      }else if(par.Name==='u_obtc'){
        // algo(par.msg_to_u);
      }
     });
    c.write('I\'m u_server\r\n');
    c.pipe(c);
  });
  u_server.listen(path, function() {
    console.log('u_serverbound on %s', path);
  });
});


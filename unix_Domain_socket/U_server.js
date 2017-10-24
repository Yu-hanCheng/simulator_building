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
  var server = net.createServer(function(c) {
    console.log('server connected');
    c.on('end', function() {
      console.log('server disconnected');
    });
    c.on('data', (chunk) => { console.log(chunk.toString());
      var par = JSON.parse(chunk);
      if(par.Name==='code'){
        // sysfork(par.msg_to_u);
      }else if(par.Name==='u_obtc'){
        // algo(par.msg_to_u);
      }
     });
    c.write('I\'m server \r\n');
    c.pipe(c);
  });
  server.listen(path, function() {
    console.log('server bound on %s', path);
  });
});


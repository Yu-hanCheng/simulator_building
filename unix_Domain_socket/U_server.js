var net = require('net');
var fs = require('fs');
var path = '/tmp/server_child.sock';
fs.unlink(path, function () {
  var u_server= net.createServer(function(c) {

    console.log('u_serverconnected');
    c.on('data', (chunk) => { 
      console.log(chunk.toString());
     });
    c.write('I\'m u_server\r\n'); 
    c.on('end', function() {
      console.log('u_serverdisconnected');
    });

  });

  u_server.listen(path, function() {
    console.log('u_serverbound on %s', path);
  });
});


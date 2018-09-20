var http = require('http');
var fs = require('fs');

var FileServer = require('./app/fileserver');

var server = http.Server(FileServer);

var io = require('socket.io')(server);
require('./app/socket')(io);

var port = process.env.PORT || 3000;

server.listen(port);
console.log('Server listening at port %d', port);
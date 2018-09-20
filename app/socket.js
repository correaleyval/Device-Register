
var xss = require('xss');
var ldap = require('./ldap');
var db = require('./db');

module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log('Conected from: ' + socket.handshake.address);
        postedUser(socket);
        macSended(socket);
    });
}

function postedUser(socket) {
    socket.on('postedUser', function(data) {
        data.postUser = xss(data.postUser);

        if(data.postUser.indexOf('&') != -1) {
            validationError(socket, 'Nombre de usuario no permitido');
            return;
        }

        socket.username = (data.postUser);
        var ldapuser = socket.username + '@uo.edu.cu';
        var ldappass = data.postPasswd;
/*
        ldap.authenticate(ldapuser, ldappass, function(err, user) {
            if (err) {
                validationError(socket, 'Credenciales incorrectas');
            }
            else
                socket.emit('renderDevReg', {user: user.cn, uid: user.uid});
        });
*/
        socket.emit('renderDevReg', {user: ldapuser, uid: ldappass});
    });
}

function macSended(socket) {
    socket.on('macSended', function(data) {

        db.saveMac(socket.username, data.mac1, data.mac2, data.mac3);

        validationError(socket, "Dispositivos registrados");
    });
}

function validationError(socket, error) {
    socket.emit('validationError', {error});
}

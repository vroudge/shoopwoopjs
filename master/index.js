/**
 * Created by Psykopatik on 28/10/2015.
 */


var processes = [];
var consts = require('./consts')();

var net = require('net')
    ,server = net.createServer(function(socket) {
        socket.name = socket.remoteAddress + ":" + socket.remotePort;

        processes.push(socket);

        socket.on('connection', function(){
            console.log(socket.remoteAdress);
        });

        socket.on('data', function(data) {
            try{
                JSON.parse(data);
                var comm = new Comm(data.origin);
            }catch(error){
                socket.destroy();
                console.error("error parsing incoming data")
            }

        });

        socket.on('close', function() {
            socket.destroy(); // kill client after server's response
        });
        socket.on('end', function () {
            clients.splice(clients.indexOf(socket), 1);
            broadcast(socket.name + " left.");
        });

    }).listen(1337, '127.0.0.1', function(){
        console.log('listening');
    });

function Comm(origin){
    var client = new net.Socket();

    client.connect(origin.port, origin.ip, function() {

    });
    return this
}



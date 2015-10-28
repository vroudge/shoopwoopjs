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
                var parsedData = JSON.parse(data);
                console.log(parsedData);
                sendMessage(socket, data);
            }catch(error){
                socket.destroy();

                console.error("error parsing incoming data")
                console.error(error);
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

function sendMessage(socket, origin){
    socket.write("kek");
}





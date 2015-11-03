/**
 * Created by Psykopatik on 28/10/2015.
 */

//TODO parse a config file directly for all data
    //todo buffersize manager sur ce serveur

var processes = [];
var consts = require('./consts')();

var currentServerName = "master";

var net = require('net'),
    server = net.createServer(function(socket) {

        socket.on('connection', function(){
            console.log(socket.remoteAdress);
        });

        socket.on('data', function(data) {
            try{
                var parsedData = JSON.parse(data);
                console.log(parsedData);

                socket.name = socket.remoteAddress + ":" + socket.remotePort;
                processes.push(socket);

                socketUtils.sendMessage(socket, tools.createMessage("core:registered", "OK"));
            }catch(error){
                socket.destroy();
                console.error("Error parsing incoming data");
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

        socket.on('error',function(data){
            console.error(data);
        })

    }).listen(1337, '127.0.0.1', function(){
        console.log('listening');
    });



var tools = {
    createMessage: function (name, message) {
        return {
            _sender: currentServerName,
            _name: name,
            _message: message
        }
    }
};

var socketUtils = {
    _client : new net.Socket(),
    sendMessage:function(socket, message){
        try{
            socketUtils._client.connect(socket.remoteAddress, socket.remotePort, function() {
                socketUtils._client.write(JSON.stringify(message));
            });
        }catch(error){
            console.log(error);
        }

    }

};




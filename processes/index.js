/**
 * Created by Psykopatik on 28/10/2015.
 */
var processes = [];

var consts = require('./consts')();
var os = require("os");
var net = require('net')
    ,client = new net.Socket()
    ,server = net.createServer(function(socket) {
        socket.on('connection', function(){
            console.log(socket.remoteAdress);
        });

        socket.on('data', function(data) {
            console.log('Received: ' + data);

        });

        socket.on('close', function() {
            console.log('Connection closed');
        });

        socket.on('error', function(error){
            console.log(error);
        })

    }).listen(consts.port, consts.host, function(){
        console.log('listening');
    });

//todo retry on fail
client.connect(consts.master.split(":")[1], consts.master.split(":")[0], function() {
    console.log('Connected');
    client.write("event:subscribe");
});




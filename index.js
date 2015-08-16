var express = require("express");
var app = express();


app.use(express.static(__dirname +'/public'));

//routes



app.route('/cool')
    .get(function(req,res){

    	res.sendFile(__dirname+'/public/html/404.html');

    });

    var server = app.listen(3000, function(){

console.log(" the server is running on port 3000");

    })

    var socketio = require("socket.io");
    var io = socketio.listen(server);
    var count = 0;


    io.on('connection',function(socket){

    	console.log ("a user has connected");

        count++;

        console.log (count);

        socket.emit('message',{ count: count});


    	socket.on('disconnect', function(){

    		console.log("a user has left");

            count --;

            console.log (count);

            socket.emit('message',{ count: count});



    	});



        socket.emit('initialize', "initialized");

    });
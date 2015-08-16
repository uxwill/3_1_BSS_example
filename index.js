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

    io.on('connection',function(socket){

    	console.log ("a user has connected");

        //listens to the event name and the callback function that does whatevr we want

    	socket.on('ping', function() {

		console.log("ping received")

        //socket talks back on the individual connection, whereas io.emit is everyone that is connected

		socket.emit('pong', "hey y'all message received");

    	});

    	socket.on('disconnect', function(){

    		console.log("a user has left");

    	});
//this says: when this event happens, do something else. it is linking to changeBackground
//the event gets the informatoin (data) and then passes it to the call back function

        socket.on('changeBackground', function(data) {

                console.log(data);
                io.emit('setBackground', data);

                //io.emit sends to everyone connected

        });

        socket.emit('initialize', "initialized");

    });
$(document).ready(function() {

    var socket = io();

    $('#ping').click(function() {
        socket.emit('ping', 'Hello Server');
        console.log('pinged');
    });

    socket.on('pong', function(data) {
        console.log("server responed: " + data);
        $('#serverResponse').append('Server says: ' + data + '</br>');
    });

    $('#changeBackground').click(function() {
        //logic to generate random colour in hex
        var newColour = '#' + Math.floor(Math.random() * 16777215).toString(16);
        //send to server
        socket.emit('changeBackground', newColour);
    });

    socket.on('setBackground', function(data) {
        //wait for server to send colour details in 'setBackground' message then changethe colour to $
        $('body').css("background-color", data);
    })

});

const express  = require('express')
const socket = require('socket.io')
const bodyParser = require('body-parser')
const cors = require('cors')
const moment = require('moment')


var clients = {};
const app = new express()


app.use(bodyParser.json())
app.use(cors())
 

var server = app.listen(3000,() => {
    console.log("Howdy, I am running at PORT 3000");
})

let io = socket(server, {
    cors: {
        origins: ["*"],
    }
});


io.on('connection', function(socket) {
    
    socket.on('join', (username) => {
    clients[socket.id] = username;
        io.emit("userList", JSON.stringify(clients))
        console.log(clients)
    });

    socket.on('SEND_MESSAGE', function(data) {
        io.emit('MESSAGE', {
            ...data,
            timestamp: moment().format('h:mm a'),
        })
    });

    socket.on('disconnect', () => {
    delete clients[socket.id]
    console.log('user disconnected');
    console.log(clients);
    
  });
})

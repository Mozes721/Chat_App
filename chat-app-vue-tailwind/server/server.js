const express  = require('express')
const socket = require('socket.io')
const bodyParser = require('body-parser')
const cors = require('cors')
const moment = require('moment')
const { addUser, removeUser, getUser} = require("./users");
const users = require('./users')

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

        const { error, user } = addUser(
            { id: socket.id, name: username });
 
        if (error) return callback(error);

        io.emit("userList", user)
    // clients[socket.id] = username;
    //     io.emit("userList", {
    //         ...clients
    //     })
    //     console.log(clients)
        console.log("Added users")
        console.log(user)
    });

    socket.on('SEND_MESSAGE', function(data) {
        io.emit('MESSAGE', {
            ...data,
            timestamp: moment().format('h:mm a'),
        })
    });

    socket.on('disconnect', () => {
    console.log(removeUser(socket.id));

    console.log('user disconnected');
    // console.log(user);
    
  });
})

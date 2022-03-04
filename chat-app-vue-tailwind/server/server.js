const express  = require('express')
const socket = require('socket.io')
const bodyParser = require('body-parser')
const cors = require('cors')
const moment = require('moment')
const { addUser, removeUser, getUser} = require("./users");
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
        // if (user != users.leng)
        io.emit("userList", user)
        
        console.log(users)
        socket.broadcast.emit('user_joined', {
            username
        })
    });

    socket.on('SEND_MESSAGE', function(data) {
        io.emit('MESSAGE', {
            ...data,
            timestamp: moment().format('h:mm a'),
        })
    });
    socket.on('typing', function(data) {
        socket.broadcast.emit('userTyping', {
            ...data
        });
    })
   
    socket.on('disconnect', () => {
    // getUser(socket.id);     
    socket.broadcast.emit("userLeft", getUser(socket.id))
    removeUser(socket.id);
    
  });
})
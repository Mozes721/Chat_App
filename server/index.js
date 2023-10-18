const express  = require('express')
const socket = require('socket.io')
const bodyParser = require('body-parser')
const cors = require('cors')
const moment = require('moment')
const { addUser, removeUser, getUser, users} = require("./users");

require('dotenv').config()
const app = new express()


app.use(bodyParser.json())
app.use(cors())

const port = process.env.PUBLIC_ENV_SOCKET || 3000;
const client_port =  process.env.VUE_CLIENT_URL || "*";
 

var server = app.listen(port,() => {
    console.log(`Howdy, I am running at PORT ${port}`);
})

app.get("/api", (req, res) => {
    res.send(`Howdy, I am running at PORT ${port}`)
})

let io = socket(server, {
    cors: {
        origins: [client_port],
    }
});
 

io.on('connection', function(socket) {
    socket.on('join', (username) => {
        const { error, user } = addUser(
            { id: socket.id, name: username });
        if (error) return callback(error);
        console.log(users);
        socket.broadcast.emit('user_joined', {
            username
        })
        const names = users.map(user => user.name);

        io.emit('user_list_update', names);
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
   
    socket.on('disconnect', function() {
        const removedUser = removeUser(socket.id);
        if (removedUser) {
            socket.broadcast.emit("userLeft", {
                username: removedUser.name
            });
            const names = users.map(user => user.name);

            io.emit('user_list_update', names);
        }
    });
})
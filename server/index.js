const express  = require('express')
const app = new express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io')
const io = new Server(server);
const bodyParser = require('body-parser')
const cors = require('cors')
const moment = require('moment')
const { addUser, removeUser, users} = require("./users");

require('dotenv').config()


app.use(bodyParser.json())

const port = process.env.PORT || 3000;
const client_port = process.env.VUE_CLIENT_URL || 8080;
 

server.listen(port,() => {
    console.log(`Howdy, I am running at PORT ${port}`);
})

const corsOptions = {
    origin: client_port,
    preflightContinue:false,
    credentials: true
  }


  app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.write(`<h1>Socket IO Start on Port : ${port}</h1>
                <h1>Listening Requests from Port : ${client_port}</h1>`);
    res.end();
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
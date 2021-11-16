const express  = require('express')
const socket = require('socket.io')
const bodyParser = require('body-parser')
const cors = require('cors')
const moment = require('moment')

let users = [];

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

io.on('connection', socket => {
    socket.on('join server', (username) => {
        const user = {
            username,
            id: socket.id,
        };
        users.push(user);
        io.emit('new user', users);
    });
    socket.io("join room", (roomName, cb) => {
        socket.join(roomName);
        cb(messages[roomName]);
    });

})

// io.on('connection', function(socket) {
//     console.log(socket.id)
//     socket.on('SEND_MESSAGE', function(data) {
//         io.emit('MESSAGE', {
//             ...data,
//             timestamp: moment().format('h:mm a'),
//         })
//     });
// }); 

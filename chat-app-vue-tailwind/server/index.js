const express  = require('express')
const socket = require('socket.io')
const bodyParser = require('body-parser')
const cors = require('cors')

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
    console.log(socket.id)
    socket.on('SEND_MESSAGE', function(data) {
        io.emit('MESSAGE', data)
    });
});
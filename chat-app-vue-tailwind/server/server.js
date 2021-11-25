const express  = require('express')
const socket = require('socket.io')
const bodyParser = require('body-parser')
const cors = require('cors')
const moment = require('moment')

var users = [];

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
    socket.username = 'anonymous';
    socket.on('join', (username) => {
       if (username != null) {
      socket.username = username
      console.log(socket.username, socket.id)
    } if(username != users) {
        users.push(username);
    }
    }),
    
    socket.on('SEND_MESSAGE', function(data) {
        io.emit('MESSAGE', {
            ...data,
            timestamp: moment().format('h:mm a'),
        })
    });
    socket.on('disconnect', () => {
        
    console.log('user disconnected');
  });
})



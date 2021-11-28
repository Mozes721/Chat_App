const express  = require('express')
const socket = require('socket.io')
const bodyParser = require('body-parser')
const cors = require('cors')
const moment = require('moment')

  
var socketArr = [];
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
    socketArr.push({
			id: socket.id,
			name: username,
		})
        // var userList = {
		// 	socketArr: socketArr
		// };
        io.emit("userList", JSON.stringify(socketArr))
        console.log(socketArr)
    });

    socket.on('SEND_MESSAGE', function(data) {
        io.emit('MESSAGE', {
            ...data,
            timestamp: moment().format('h:mm a'),
        })
    });

    socket.on('disconnect', () => {
    console.log(io.sockets.sockets)    
    console.log('user disconnected');
  });
})

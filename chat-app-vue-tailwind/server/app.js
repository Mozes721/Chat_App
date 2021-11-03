const app = require('express')();

const http = require('http').Server(app);


http.listen(3000, () => {
  console.log('listening on *:3000');
});
 
const io = require('socket.io')(server);

io.on("connection", (socket) => {
  console.log("connected to " + socket.id) //this is successfully getting logged
  socket.on("SEND_MESSAGE", (msg) => {
    console.log(socket.id + ": " + msg) //this is successfully getting logged when I click send
    io.sockets.emit("chat", msg) 
  } )
} )

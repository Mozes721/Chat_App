const express  = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require("socket.io");

const { SERVER_PORT, VUE_CLIENT_URL} = require('./config');
const { setUpSocketIO  } = require('./socket');


let io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
      }
});

app.get('/', (req, res) => {
    res.write(`<h1>Socket IO Start on Port: ${SERVER_PORT}</h1>
              <h1>Listening Requests from Port: ${VUE_CLIENT_URL}</h1>`);
    res.end();
});

setUpSocketIO(io); 

server.listen(PORT, () => {
    console.log(`listening on ${SERVER_PORT}`);
});






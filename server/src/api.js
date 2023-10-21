const express  = require('express');
const http = require('http');
const socket = require('socket.io')

const { configureServer, PORT, VUE_CLIENT_URL} = require('./config');
const { setUpSocketIO } = require('./socket');

const app = express();

configureServer(app);
const server = http.createServer(app);


let io = socket(server, {
    cors: {
        origins: [VUE_CLIENT_URL],
    }
});

server.listen(PORT, () => {
    setUpSocketIO(io); 
});

app.get('/', (req, res) => {
    res.send(`<h1>Socket IO Start on Port: ${PORT}</h1>
              <h1>Listening Requests from Port: ${VUE_CLIENT_URL || 'http://localhost:8080'}</h1>`);
});




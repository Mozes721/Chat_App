const express  = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const {  setupCORS, PORT, VUE_CLIENT_URL} = require('./config');
const { setUpSocketIO  } = require('./socket');

const io = setupCORS(server)

app.get('/', (req, res) => {
    res.write(`<h1>Socket IO Start on Port: ${PORT}</h1>
              <h1>Listening Requests from Port: ${VUE_CLIENT_URL}</h1>`);
    res.end();
});

setUpSocketIO(io); 

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});






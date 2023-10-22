const { Server } = require("socket.io");
require('dotenv').config()

const PORT = process.env.PORT || 3000;
const VUE_CLIENT_URL = process.env.VUE_CLIENT_URL || 8080

const corsOptions = {
    origin: [VUE_CLIENT_URL],
    preflightContinue: false,
    credentials: true,
};

function setupCORS(server) {
    const io = new Server(server, {
        cors: {
          origin: [VUE_CLIENT_URL],
          methods: ['GET', 'POST'],
          preflightContinue:false,
          credentials: false
        },
    });
    return io
}


module.exports = {  setupCORS, PORT, VUE_CLIENT_URL };
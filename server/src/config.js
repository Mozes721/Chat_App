const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config()

const PORT = process.env.PORT || 3000;
const VUE_CLIENT_URL = process.env.VUE_CLIENT_URL || 8080

function configureServer(app) {
    const corsOptions = {
        origin: VUE_CLIENT_URL,
        preflightContinue: false,
        credentials: true,
      };

    app.use(cors(corsOptions));
}

module.exports = { configureServer, PORT, VUE_CLIENT_URL, bodyParser };
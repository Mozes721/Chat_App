require('dotenv').config()

const PORT = process.env.PORT || 3000;
const VUE_CLIENT_URL = process.env.VUE_CLIENT_URL || 8080


module.exports = {  PORT, VUE_CLIENT_URL };
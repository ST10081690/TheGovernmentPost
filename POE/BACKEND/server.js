//Referencing:
//The Independent Institute of Education. 2023. APDS7311 Lab Guide.

//setting up the server connection
const https = require('https');
const app = require('./app');
const fs = require('fs');

//specifying port
const PORT = 3000;

//using private key and ssl
const server = https.createServer(
    {
        key: fs.readFileSync('keys/privatekey.pem'),
        cert: fs.readFileSync('keys/certificate.pem'),
    },app);


server.listen(PORT)

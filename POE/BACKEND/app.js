//Referencing:
//The Independent Institute of Education. 2023. APDS7311 Lab Guide.

const helmet = require("helmet");
const morgan = require("morgan");
const express = require('express');
const app = express();
const urlprefix = '/api'
const mongoose = require('mongoose')
const Post = require('./models/posts')
const fs = require('fs');
const cors = require('cors');
const cert = fs.readFileSync('keys/certificate.pem');
const options = {
    server: {sslCA: cert}};
const connstring = 'mongodb+srv://st10081690:ebSdUtjyPMm9M5do@clusterapds.flxnnx5.mongodb.net/?retryWrites=true&w=majority';

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

//connecting to database
mongoose.connect(connstring)
.then(()=>
{
    console.log('Connected :-)')
})
.catch(()=>
{
    console.log('NOT CONNECTED')

},options);

//using express
app.use(express.json());

//using helmet
app.use(helmet());

//Using morgan
//Choosing combined format for its extensive and detailed request logging,
//providing a lot of information about the request and the user who made the request
//thus increasing the insight levels gathered from the server.
app.use(morgan('combined'));

//middleware
app.use(cors());
app.use(
    cors({
        credentials:true,
        origin: 'http://localhost:4200',
        methods:'GET, HEAD, POST, PATCH, PUT, DELETE'      
    })
);

//catering for CORS
app.use((reg,res,next)=>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods','*');
    next();
});

app.get(urlprefix+'/', (req,res) => {
    
    res.send('Hello World')

})

app.use(urlprefix+ '/posts', postRoutes)
app.use(urlprefix+ '/users', userRoutes)

module.exports = app;
const express = require('express') ; 

const app = express() ; 

const mongoose = require('mongoose') ; //For database connection

const bodyParser = require('body-parser') ; //This is to read from db

const cors = require('cors') ; //To enable cross locals


require('dotenv/config') ; //For security purposes, keeps are connections string out of the public eye
//and keeps our cheese out of the wind


//Middlewares
app.use(bodyParser.json()) ; //Allows it to read requests in json

app.use(cors()) ; //Allows for swapping between host locals

app.use('/midware', (req,res)=>
{
    console.log("User has activated the middle ware") ; 
})

//Import Different Routes
const postsRoute = require('./routes/posts') ; 

app.use('/posts', postsRoute) ; 

//ROUTES
app.get('/', (req,res)=>
{
    res.send("We are on the home page.") ; 
})

app.get('/ee', (req,res)=>
{
    res.send('We are on the secret EE page.') ; 
})


//Connect to our DB

mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true }, () =>
{
    console.log("Connected to DB.") ; 
});

//How to start server?
app.listen(3000);
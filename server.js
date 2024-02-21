const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const PORT = process.env.PORT

// MIDDLEWARE //
app.use(express.json());
app.use(morgan('dev'));

// ROUTES //


// DB CONNECTION //
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://acrawford0221:GBXB5BMNpklRyQsk@rtvcluster.7on5rv6.mongodb.net/?retryWrites=true&w=majority&appName=rtvCluster', ()=> {
    console.log('Connected to the DB')
})

// ERROR HANDLER //
app.use((err,req,res,next)=> {
    console.log(err)
    return res.send({errMsg: err.message})
})

// PORT //
app.listen(PORT, ()=> {
    console.log('The server is running on port 7200')
})
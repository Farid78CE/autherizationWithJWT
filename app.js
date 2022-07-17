const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/user.js');


const app = express();

const port = 2000; 
const uri = "mongodb+srv://<username>:<password>@fullstackexpressvue.wskfn.mongodb.net/test";


mongoose.connect(uri, {useNewUrlParser:true});
const database = mongoose.connection;

database.on('error', (error)=>{
    console.log(error)
})

database.once('connected', ()=>{
    console.log('database connected');
})

app.use(express.json());
app.use(cors());
app.use('/api/v1/user', userRouter);

app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`)
})


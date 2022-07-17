const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    first_name: {
        type: String,
        required: false
    },
    last_name:{
        type: String,
        required: false 
    },
    email: {
        type: String,
        required: false,
        unique: true 
    },
    password: {
        type : String,
        required: true 
    }, 
    token: {
        type: String,
        required: false
    }

});

const Model = mongoose.model('user', userSchema);

module.exports = Model;
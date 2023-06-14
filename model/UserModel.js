const mongoose = require("mongoose");
const schema = mongoose.Schema

const Userschema = new schema({

    user: { 
        type: String,
        ref: 'Profile'   
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    password : {
        type: String,
        required: true
    }, 
    isActive:{
        type: Boolean,
        default: false
    }

}, { timestamp : true})

module.exports = mongoose.model('User', Userschema)
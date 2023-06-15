const mongoose = require("mongoose");
const schema = mongoose.Schema

const Userschema = new schema({
    email: {
        type: String,
        required: true,
        unique : true
    },
    password : {
        type: String,
        required: true
    }
}, { timestamp : true})

module.exports = mongoose.model('User', Userschema)
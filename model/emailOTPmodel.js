const mongoose = require("mongoose");
const schema = mongoose.Schema

const emailOTPschema = new schema({
    email: {
        type: String,
        required: true
    },
    code: { 
        type: String,
        required: true,   
    }
}, { timestamp : true})

module.exports = mongoose.model('otp', emailOTPschema)
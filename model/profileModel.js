const mongoose = require("mongoose");
const schema = mongoose.Schema

const Profileschema = new schema({
    image: { 
        type: String

    },
    user: { 
        type: String,
        required: true,   
    },
    user_id: {
        type: String,
        required: true
    },
    country : {
        type: String,
        required: true
    }
    ,
    gender : {
        type: String,
        required: true
    }
}, { timestamp : true})

module.exports = mongoose.model('Profile', Profileschema)
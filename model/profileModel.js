const mongoose = require("mongoose");
const schema = mongoose.Schema

const Profileschema = new schema({
    firstname: {
        type: String,
        required: true
    },
    surname: { 
        type: String,
        required: true,   
    },
    country : {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    affiliate: {
        type: String,
        required: true
    },
    affiliate_amount: {
        type: String,
        required: true
    },
    song_purchased: {
        type: String,
        required: true
    },
    type_of_account:{
        type: String,
        required: true
    },
    withdrawal_amount:{
        type: String,
        required: true
    },
    number_of_withdrawals:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    account_number: {
        type: String,
        required: true
    },
    dollar: {
        type: String,
        required: true
    },
    naira: {
        type: String,
        required: true
    },
    bank_name: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamp : true})

module.exports = mongoose.model('Profile', Profileschema)
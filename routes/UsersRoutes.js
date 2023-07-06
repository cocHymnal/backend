const express = require('express')
const router = express.Router()

// Users controller
const {  RegisterUser, UpdateAffiliate , VerifyPhone, ConfirmPhone } = require('../controller/userController')

// Sign Up route
router.post('/verify-phone', VerifyPhone )

// Sign Up route
router.post('/confirm-phone', ConfirmPhone )

// Login route 
router.post("/update-affiliate", UpdateAffiliate);

// Register route 
router.post("/register", RegisterUser);

module.exports = router

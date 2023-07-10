const express = require('express')
const router = express.Router()

// Users controller
const {  RegisterUser, UpdateAffiliate, VerifyPhone, ConfirmPhone, SigninUser, loginUser, OTPverification } = require('../controller/userController')

// Sign Up route
router.post('/verify-phone', VerifyPhone )

// Sign Up route
router.post('/otp-verifiation', OTPverification )

// Sign Up route
router.post('/login', loginUser )

// Sign Up route
router.post('/signup', SigninUser )

// Sign Up route
router.post('/confirm-phone', ConfirmPhone )

// Login route 
router.post("/update-affiliate", UpdateAffiliate);

// Register route 
router.post("/register", RegisterUser);

module.exports = router

const express = require('express')
const router = express.Router()

// Users controller
const {  loginUser, SigninUser ,ResetPassword,OTP,  NewPassword, SearchUser, updateActiveStatus } = require('../controller/userController')

// Sign Up route
router.post('/signup', SigninUser, )

// Login route 
router.post("/login", loginUser);
router.post("/otp", OTP);
router.post("/reset-password", NewPassword);
router.post("/forgot-password",ResetPassword);

router.get("/search", SearchUser)
router.post("/restrict-user", updateActiveStatus)


module.exports = router

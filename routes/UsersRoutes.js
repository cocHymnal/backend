const express = require('express')
const router = express.Router()

// Users controller
const {  loginUser, SigninUser  } = require('../controller/userController')

// Sign Up route
router.post('/signup', SigninUser )

// Login route 
router.post("/login", loginUser);

module.exports = router

const express = require('express')
const router = express.Router()

// Users controller
const {  loginUser,RegisterUser, SigninUser  } = require('../controller/userController')

// Sign Up route
router.post('/signup', SigninUser )

// Login route 
router.post("/login", loginUser);

// Register route 
router.post("/register", RegisterUser);

module.exports = router

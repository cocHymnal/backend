const express = require('express')
const router = express.Router()

// Users controller
const { approveApp, ad  } = require('../controller/adminControllers')

// Sign Up route
router.post('/approve-purchase', approveApp )
router.post('/ad', ad )

module.exports = router

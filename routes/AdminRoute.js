const express = require('express')
const router = express.Router()

// Users controller
const { approveApp  } = require('../controller/adminControllers')

// Sign Up route
router.post('/approve-purchase', approveApp )

module.exports = router

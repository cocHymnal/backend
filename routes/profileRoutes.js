const express = require('express')
const router = express.Router()

const { CreateAccount, UserPro, AllUsers, updateUsername } = require("../controller/profileController")
const requireAuth = require('../middleware/requireAuth')

// require auth for all route
router.use(requireAuth)

router.post('/', CreateAccount)
router.get('/all-profile', AllUsers)
router.get('/update', updateUsername)

router.get('/:id', UserPro)

module.exports = router
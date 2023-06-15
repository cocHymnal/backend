const express = require('express')
const router = express.Router()

const { RegisterUser, UserPro, AllUsers, UpdateAffiliate, adminProfile, purchaseApp} = require("../controller/profileController")
const requireAuth = require('../middleware/requireAuth')

// require auth for all route
router.use(requireAuth)

router.post('/register', RegisterUser)
router.post('/update-affiliate', UpdateAffiliate)
router.get('/all-profile', AllUsers)
router.get('/admin-profile', adminProfile)
router.get('/purchase-app', purchaseApp)
router.get('/:id', UserPro)

module.exports = router
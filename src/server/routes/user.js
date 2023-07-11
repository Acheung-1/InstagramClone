const express = require('express')

// controller functions
const { 
    loginUser, 
    signUpUser,
    getAvatar,
    updateAvatar
 } = require('../controllers/userController')
const router = express.Router()

// login route
router.post('/login', loginUser)

// sign up route
router.post('/signup', signUpUser)

// get profile pic and about
router.get('/Profile/:username', getAvatar)

// update profile pic and about
router.patch('/Profile/:username', updateAvatar)

module.exports = router
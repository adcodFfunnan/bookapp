const express = require('express')
const { registerNewUser, userLogin, userLogout, refreshAccessToken, authenticateToken } = require('../controllers/auth.js')



const router = express.Router()

router.post('/users/register', registerNewUser)
router.post('/users/login', userLogin)
router.delete('/users/logout', userLogout)
router.post('/users/refreshtoken', authenticateToken, refreshAccessToken)

module.exports = router
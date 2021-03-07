const router = require('express').Router()
const Controller = require('../controllers/users.js')

router.post('/register', Controller.registerUser)
router.post('/login', Controller.loginUser)

module.exports = router
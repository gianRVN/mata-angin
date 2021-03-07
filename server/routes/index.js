const router = require('express').Router()
const news = require('./news')
const user = require('./users')

router.use('/users', user)
router.use('/news', news)

module.exports = router
const router = require('express').Router()
const Controller = require('../controllers/news.js')
const { authenticate } = require('../middlewares/auth.js')

router.use(authenticate)
router.get('/', Controller.getNews)
router.get('/:newsID', Controller.getOneNews)
router.post('/', Controller.postNews)
router.put('/:newsID', Controller.putNews)
router.delete('/:newsID', Controller.deleteNews)

module.exports = router
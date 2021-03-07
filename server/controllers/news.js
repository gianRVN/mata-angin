const { News } = require('../models')

class Controller {
  static getNews(req, res, next) {
    News.findAll({
      where: {
        UserId: +req.user.id
      }
    })
      .then(news => {
        res.status(200).json(news)
      })
      .catch(err => {
        next(err)
      })
  }

  static getOneNews(req, res, next) {
    News.findOne({
      where: {
        id: +req.params.newsID
      }
    })
      .then(news => {
        res.status(200).json(news)
      })
      .catch(err => {
        next(err)
      })
  }

  static postNews(req, res, next) {
    const { name, image_url, article } = req.body
    News.create({
      name, image_url, article, UserId: +req.user.id
    })
      .then(news => {
        res.status(201).json(news)
      })
      .catch(err => {
        next(err)
      })
  }

  static putNews(req, res, next) {
    const { name, image_url, article } = req.body
    News.create({
      name, image_url, article, UserId: +req.user.id
    },
      {
        where: {
          id: +req.params.newsID
        }
      })
      .then(news => {
        res.status(201).json({ message: "A news is updated" })
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteNews(req, res, next) {
    News.destroy({
      where: {
        id: +req.params.newsID
      }
    })
      .then(news => {
        res.status(200).json({ message: "A News is deleted" })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = Controller
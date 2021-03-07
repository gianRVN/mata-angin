const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

class Controller {
  static registerUser(req, res, next) {
    console.log(req.body, 'masuk regist')
    const { firstName, lastName, email, password } = req.body
    console.log(firstName, lastName, email, password)
    User.create({
      first_name: firstName, 
      last_name: lastName,  
      password, 
      email
    })
      .then(userData => {
        console.log(userData, "berhasil")
        const payload = {
          id: userData.id,
          email: userData.email,
          password: userData.password
        }
        const token = generateToken(payload)
        res.status(201).json(token)
      })
      .catch(err => {
        console.log(err.stack, "<<<<<<<<")
        next(err)
      })
  }

  static loginUser(req, res, next) {
    const { email, password } = req.body
    User.findOne({
      where: {
        email
      }
    })
      .then(userData => {
        if (!userData) {
          next({ message: 'Invalid Email/Password' })
        }
        const check = comparePassword(password, userData.password)
        if (!check) {
          next({ message: 'Invalid Email/Password' })
        } else {
          const payload = {
            id: userData.id,
            email: userData.email,
            password: userData.password
          }
          const token = generateToken(payload)
          res.status(200).json(token)
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = Controller
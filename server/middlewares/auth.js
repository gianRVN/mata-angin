const { tokenCheck } = require("../helpers/jwt")
const { User } = require("../models")

function authenticate(req, res, next) {
    console.log(req.headers.token, 'masuk authenticate')
    let decoded = tokenCheck(req.headers.token)
    console.log(decoded, 'ini decoded')
    User.findOne({
        where: {
            email: decoded.email
        }
    })
        .then(user => {
            console.log(user.id, 'masuk user ga')
            if (!user) {
                next({ name: "SignInError" })
            } else {
                console.log('ada user')
                req.user = user
                next()
            }
        })
        .catch(err => {
            console.log(err.stack, "KENAWHY")
            next(err)
        })
}

module.exports = { authenticate }
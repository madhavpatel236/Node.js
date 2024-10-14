const jwt = require('jsonwebtoken')
const User = require('../models/user')


// It is a middleware which is authenticate the user with the help of the Cookies and Token.
const userAuth = async (req, res, next) => {

    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Tocken is not Valid!!!!!")
        }

        // validate my token.
        const decodeMessage = await jwt.verify(token, 'Madhav@123')
        console.log(decodeMessage)

        const { _id } = decodeMessage

        const user = User.findById(_id)
        // console.log(user)
        if (!user) {
            throw new Error("User is not valid!!!!!")
        }
        next()
    } catch (err) {
        res.status(400).send("ERROR; " + err.message)
    }
}

module.exports = {
    userAuth,
} 
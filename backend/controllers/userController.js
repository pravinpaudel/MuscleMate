const User = require('../models/usersModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' }) // Tokens expires in 3 days. User remains logged in for 3 days
}

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)

        res.status(200).json({
            email: email,
            token
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const signupUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.signup(email, password)
        const token = createToken(user._id)
        res.status(200).json({
            email: email,
            token
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    loginUser,
    signupUser
}
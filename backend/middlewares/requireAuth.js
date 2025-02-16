const jwt = require('jsonwebtoken')
const User = require('../models/usersModel')

const requireAuth = async (req, res, next) => {
    
    // Verify authentication
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({
            message: "Authorization token required!"
        })
    }

    const token = authorization.split(' ')[1]
    try {
        // Returns the payload if verified
        const { _id } = jwt.verify(token, process.env.SECRET)

        // Attach user property to req so that we can use it later
        req.user = await User.findOne({ _id }).select('_id')

        next()

    } catch (error) {
        console.log(error.message)
        res.status(401).json({
            message: 'Request is not authorised'
        })
    }
}

module.exports = requireAuth
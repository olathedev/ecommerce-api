const jwt = require('jsonwebtoken')

const createToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })

    return token 
}

module.exports = createToken
const jwt = require('jsonwebtoken')

const createToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })

    return token 
}


const verifyJwt = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

const setCookie = (res, user) => {
    const token = createToken(user)

    const duration = 1000 * 60 * 60 * 72

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + duration),
        secure: process.env.NODE_ENV === 'production',
        signed: true
    })

}

module.exports = {
    createToken,
    verifyJwt,
    setCookie
}
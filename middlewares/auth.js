const CustomApiError = require('../errors/custom-errors')
const { verifyJwt } = require('../utils')

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token

    if(!token) {
        throw new CustomApiError.UnAuthorizedError("token not found")
    }

    try {

        const {_id, email, role} = verifyJwt(token)
        req.user = {userId: _id, email, role}
        next()

    } catch (error) {

        throw new CustomApiError.UnAuthorizedError("Invalid token")
        
    }

}


const authorizePermisions = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            throw new CustomApiError.UnAuthorizedForbiden("unAuthorised access to this route")
        }

        next()
    }
}


module.exports = {authenticateUser, authorizePermisions}
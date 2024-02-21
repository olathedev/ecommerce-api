const { StatusCodes } = require('http-status-codes')
const UserModel = require('../models/user-model')
const CustomApiError = require('../errors/custom-errors')
const {setCookie} = require('../utils')

const register = async (req, res) => {
    
    const {firstname, lastname, email, password} = req.body
    const emailExists = await UserModel.findOne({email})
    if(emailExists) {
        // const error = new Error('Email already exists')
        // error.statusCode = StatusCodes.BAD_REQUEST
        // throw error
        throw new CustomApiError.BadRequest('Email already exists')
    }
    
    // setUp Admin
    const isFirstAccount = await UserModel.countDocuments({}) === 0
    const role = isFirstAccount ? 'admin' : 'user'

    const user = await UserModel.create({firstname, lastname, email, password, role})
    const tokenUser = {_id: user._id, email: user.email, role: user.role}
    // attach token to res
    setCookie(res, tokenUser)

    res.status(StatusCodes.CREATED).json({user: tokenUser})

}

const login = async (req, res) => {
    const {email, password} = req.body

    if(!email && !password) {
        throw new CustomApiError.BadRequest("Email and password are required")
    }

    // Check if email exists in db
    const user = await UserModel.findOne({email})
    if(!user) {
        throw new CustomApiError.UnAuthorizedError("No user found with this email")
    }
    // compare passoword
    const isPasswordCorrect = await UserModel.comparePassword(password, user.password)
    if(!isPasswordCorrect) {
        throw new CustomApiError.UnAuthorizedError("incorrect password")
    }

    const tokenUser = {_id: user._id, email: user.email, role: user.role}
    // attach token to res
    setCookie(res, tokenUser)

    res.status(StatusCodes.CREATED).json({user: tokenUser})

}

const logout = async (req, res) => {
    // attach a short spanned cookie to response
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });

    res.status(200).json({msg: 'cookies gone'})
}


module.exports = {
    register,
    login,
    logout
}
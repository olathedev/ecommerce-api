const { StatusCodes } = require('http-status-codes')
const UserModel = require('../models/user-model')
const CustomApiError = require('../errors/custom-errors')
const {createToken} = require('../utils')

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
    const token = createToken({user})
    res.status(StatusCodes.CREATED).json({user, token})

}

const login = async (req, res) => {
    res.send('login')
}

const logout = async (req, res) => {
    res.send('logout')
}


module.exports = {
    register,
    login,
    logout
}
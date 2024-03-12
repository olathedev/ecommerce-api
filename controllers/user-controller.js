const { StatusCodes } = require('http-status-codes')
const UserModel = require('../models/user-model')
const CustomApiError = require('../errors/custom-errors')

const getAllUsers = async (req, res) => {
   const users = await UserModel.find({role: 'user'}).select('-password')
   res.status(StatusCodes.OK).json({users})
}

const getSingleUser = async (req, res) => {
    const {id} = req.params

    const users = await UserModel.findOne({_id: id}).select('-password')

    if(!users) {
        throw new CustomApiError.NotFoundError("No resource found with this id")
    }

    res.status(StatusCodes.OK).json({users})

}


const showCurrentUser = async (req, res) => {
    res.send("Show current user")
}


const updateUser = async (req, res) => {
    res.send("Uodate user")
}


const updateUserPassword = async (req, res) => {
    res.send("update user password")
}

module.exports =  {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}
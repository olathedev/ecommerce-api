const { StatusCodes } = require('http-status-codes')
const UserModel = require('../models/user-model')
const CustomApiError = require('../errors/custom-errors')
const { createTokenUser, setCookie, checkPermisions } = require('../utils')

const getAllUsers = async (req, res) => {
   const users = await UserModel.find({role: 'user'}).select('-password')
   res.status(StatusCodes.OK).json({users})
}

const getSingleUser = async (req, res) => {
    const {id} = req.params

    const user = await UserModel.findOne({_id: id}).select('-password')

    if(!user) {
        throw new CustomApiError.NotFoundError("No resource found with this id")
    }

    checkPermisions(req.user, user._id)
    res.status(StatusCodes.OK).json({user})

}


const showCurrentUser = async (req, res) => {
    const user = await UserModel.findOne({_id: req.user.userId})
    res.status(StatusCodes.OK).json({user})
}


const updateUser = async (req, res) => {
    const {firstname, lastname, email} = req.body

    if(!firstname || !lastname || !email) {
        throw new CustomApiError.BadRequest("provide firstname, lastname and email")
    }

    const user = await UserModel.findOneAndUpdate({_id: req.user.userId}, {firstname, lastname, email}, {new: true, runValidators: true})

    const tokenUser = createTokenUser(user)

    setCookie(res, tokenUser)

    res.status(StatusCodes.OK).json({user})


}


const updateUserPassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body

    if(!oldPassword || !newPassword) {
        throw new CustomApiError.BadRequest("Provide old and new password values")
    }

    const user = await UserModel.findOne({_id: req.user.userId})

    const isPasswordCorrect = await UserModel.comparePassword(oldPassword, user.password)
    if(!isPasswordCorrect) {
        throw new CustomApiError.UnAuthorizedError("value for oldPassword is not correct")
    }

    user.password = newPassword

    await user.save()

    res.status(StatusCodes.OK).json({message: "password updated"})

}

module.exports =  {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}
const express = require('express')
const router = express.Router()
const { authenticateUser, authorizePermisions } = require('../middlewares/auth')


const  {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
} = require('../controllers/user-controller')


router.route('/').get(authenticateUser, authorizePermisions('admin'), getAllUsers)
router.route('/showCurrentUser').get(showCurrentUser)
router.route('/updateUser').patch(updateUser)
router.route('/updateUserPassword').patch(updateUserPassword)
router.route('/:id').get(getSingleUser)

module.exports = router
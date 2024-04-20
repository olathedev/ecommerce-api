const express = require('express')

const router = express.Router()

const {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder
} = require('../controllers/order-controller')

const { authenticateUser, authorizePermisions } = require('../middlewares/auth')


router.route('/').get(authenticateUser, authorizePermisions('admin'), getAllOrders).post(authenticateUser, createOrder)

router.route('/showAllUserOrders').get(authenticateUser, getCurrentUserOrders)

router.route('/:id').get(authenticateUser, getSingleOrder).patch(authenticateUser, updateOrder)

module.exports = router

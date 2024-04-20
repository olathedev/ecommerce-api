const OrdersModel = require('../models/order-model')


const getAllOrders = async (req, res) => {
    res.send("Get all orders")
}


const getSingleOrder = async (req, res) => {
    res.send("Get Single order")
}


const getCurrentUserOrders = async (req, res) => {
    res.send("Get current User Orders")
}


const createOrder = async (req, res) => {
    res.send("create order")
}

const updateOrder = async (req, res) => {
    res.send("update order")
}


module.exports = {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder
}


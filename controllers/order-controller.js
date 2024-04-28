const OrdersModel = require('../models/order-model')
const CustomApiError = require('../errors/custom-errors')
const ProductModel = require('../models/product-model')
const { StatusCodes } = require('http-status-codes')
const { checkPermisions } = require('../utils')
const orderModel = require('../models/order-model')
const paystack = require('paystack-api')(process.env.PAYSTACK_TEST_SECRET_KEY); // Replace with your actual key if not using .env



const processPayment = async ({ amount, email }) => {

    const response = await paystack.transaction.initialize({
        amount: amount,
        email,
        // Optional: Add other transaction details as per Paystack documentation
    });

    console.log(response)
    return response
}

const createOrder = async (req, res) => {
    const { cartItems, tax, shippingFee, email } = req.body

    if (!cartItems || cartItems.length < 1) {
        throw new CustomApiError.BadRequest(
            "No cart items provided"
        )
    }

    if (!tax || !shippingFee || !email) {
        throw new CustomApiError.BadRequest(
            "Please provide tax, User-email and shipping fee"
        )
    }

    let orderItems = []
    let subTotal = []

    for (item of cartItems) {
        const dbProduct = await ProductModel.findOne({ _id: item.product })
        if (!dbProduct) {
            throw new CustomApiError.NotFoundError(
                "No product found with ID " + item.product
            )
        }

        const { name, price, image, _id } = dbProduct
        const singleOrderItem = {
            amount: item.amount,
            name,
            price,
            image,
            image,
            product: _id
        }

        orderItems = [...orderItems, singleOrderItem]
        subTotal += price * item.amount

    }

    const total = tax + shippingFee + subTotal

    const paystack = await processPayment({
        amount: total,
        email
    })

    console.log(paystack)

    const order = await OrdersModel.create({
        orderItems, total, subTotal, tax, shippingFee, paymentUrl: paystack.data.authorization_url, reference: paystack.data.reference, user: req.user.userId
    })

    res.status(StatusCodes.CREATED).json({ order, payment: order.paymentUrl })

}

const getAllOrders = async (req, res) => {
    const orders = await OrdersModel.find()
    res.status(StatusCodes.OK).json({
        orders
    })
}

const getSingleOrder = async (req, res) => {

    const { id } = req.params

    const orders = await OrdersModel.findOne({ _id: id })

    if (!orders) {
        throw new CustomApiError.NotFoundError(
            "No product found with ID " + id
        )
    }

    checkPermisions(req.user, orders.user)

    res.status(StatusCodes.OK).json({
        orders
    })
}

const getCurrentUserOrders = async (req, res) => {
    const { userId } = req.user

    const orders = await orderModel.find({ user: userId })

    res.status(StatusCodes.OK).json({
        orders
    })
}

const verifyPayment = async (req, res) => {
    const { id } = req.params

    const orders = await OrdersModel.findOne({ _id: id })

    if (!orders) {
        throw new CustomApiError.NotFoundError(
            "No product found with ID " + id
        )
    }

    checkPermisions(req.user, orders.user)

    const response = await paystack.transaction.verify({ reference: orders.reference });

    orders.status = response.data.status
   
    res.status(StatusCodes.OK).json({ msg: response.message, payment_status: orders.status })


}


module.exports = {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    verifyPayment
}


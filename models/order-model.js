const mongoose = require('mongoose')

const singleCartItemSchema = mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    amount: {type: Number, required: true},
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    }
})

const OrderSchema = mongoose.Schema({
    tax: {
        type: Number,
        required: true
    },

    shippingFee: {
        type: Number,
        required: true
    },

    subTotal: {
        type: Number,
        required: true
    },

    cartItems: [singleCartItemSchema],

    status: {
        type: String,
        enum: ['pending', 'failed', 'paid', 'delivered', 'cancelled'],
        default: 'pending',
        required: true
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    clientSecret: {
        type: String,
        required: true
    },

    paymentId: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})


module.exports = mongoose.model('Order', OrderSchema)
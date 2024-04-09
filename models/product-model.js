const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trum: true,
        required: true,
    },

    price: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: '/uploads/default.png',
        required: true
    },

    category: {
        type: String,
        required: true
    },

    company: {
        type: String,
        required: true
    },

    colors: {
        type: [String],
        default: ['#fefefe'],
        required: true
    },

    featured: {
        type: Boolean,
        required: true
    },

    freeShiping: {
        type: Boolean,
        default: false
    },

    inventory: {
        type: Number,
        required: true,
        default: 0
    },

    averageRating: {
        type: Number,
        default: 0
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {timestamps: true})


const ProductModel = mongoose.model('Product', ProductSchema)

module.exports = ProductModel
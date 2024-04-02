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
        required: true
    },
}, {timestamps: true})


const ProductModel = mongoose.model('product', ProductSchema)

module.exports = ProductModel
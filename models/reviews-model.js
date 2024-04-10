const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },

    title: {
        type: String,
        trim: true,
        required: true
    },

    comment: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
}, {timestamps: true})


ReviewSchema.index({product: 1, user: 1}, {unique: true})

const ReviewModel = mongoose.model('review', ReviewSchema)

module.exports = ReviewModel
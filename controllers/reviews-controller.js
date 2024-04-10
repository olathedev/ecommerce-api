const ReviewModel = require('../models/reviews-model')


const createReview = (req, res) => {
    res.send("create reveiw")
}

const getAllReviews = (req, res) => {
    res.send("get all reveiw")
}


const getSingleReview = (req, res) => {
    res.send("get Single Review")
}

const updateReview = (req, res) => {
    res.send("update reveiw")
}

const deleteReview = (req, res) => {
    res.send("delete reveiw")
}

module.exports = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
}
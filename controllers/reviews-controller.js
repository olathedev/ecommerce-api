const ReviewModel = require('../models/reviews-model')
const ProductModel = require('../models/product-model')
const CustomApiError = require('../errors/custom-errors')
const { createTokenUser } = require('../utils')
const { StatusCodes } = require('http-status-codes')
 


const createReview = async (req, res) => {
    const {product: productId} = req.body

    const isProductValid = await ProductModel.findOne({_id: productId})

    if(!isProductValid) {
        throw new CustomApiError.NotFoundError(
            `No product with id: ${productId}`
        )
    }

    const reviewAlreadyExists = await ReviewModel.findOne({
        product: productId,
        user: req.user.userId
    })

    if(reviewAlreadyExists) {
        throw new CustomApiError.BadRequest(
            'Already reviewed this product'
        )
    }

    req.body.user = req.user.userId

    const review = await ReviewModel.create(req.body)

    res.status(StatusCodes.CREATED).json({review})
}

const getAllReviews = async (req, res) => {
    const reviews = await ReviewModel.find()

    res.status(StatusCodes.OK).json({reviews, count: reviews.length})
}


const getSingleReview = async (req, res) => {
    const {id: productId} = req.params

    const review = await  ReviewModel.findOne({_id: productId})

    if(!review) {
        throw new CustomApiError.NotFoundError(
            `No review found with id:${productId}`
        )
    }

    res.status(StatusCodes.OK).json({review})

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
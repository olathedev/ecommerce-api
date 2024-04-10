const ReviewModel = require('../models/reviews-model')
const ProductModel = require('../models/product-model')
const CustomApiError = require('../errors/custom-errors')
const { createTokenUser, checkPermisions } = require('../utils')
const { StatusCodes } = require('http-status-codes')



const createReview = async (req, res) => {
    const { product: productId } = req.body

    const isProductValid = await ProductModel.findOne({ _id: productId })

    if (!isProductValid) {
        throw new CustomApiError.NotFoundError(
            `No product with id: ${productId}`
        )
    }

    const reviewAlreadyExists = await ReviewModel.findOne({
        product: productId,
        user: req.user.userId
    })

    if (reviewAlreadyExists) {
        throw new CustomApiError.BadRequest(
            'Already reviewed this product'
        )
    }

    req.body.user = req.user.userId

    const review = await ReviewModel.create(req.body)

    res.status(StatusCodes.CREATED).json({ review })
}

const getAllReviews = async (req, res) => {
    const reviews = await ReviewModel.find().populate({
        path: 'product',
        select: '_id name price company'
    })

    res.status(StatusCodes.OK).json({ reviews, count: reviews.length })
}


const getSingleReview = async (req, res) => {
    const { id: productId } = req.params

    const review = await ReviewModel.findOne({ _id: productId })

    if (!review) {
        throw new CustomApiError.NotFoundError(
            `No review found with id:${productId}`
        )
    }

    res.status(StatusCodes.OK).json({ review })

}

const updateReview = async (req, res) => {
    const { id: reviewId } = req.params

    const {rating, title, comment} = req.body

    const review = await ReviewModel.findOne({ _id: reviewId })

    if (!review) {
        throw new CustomApiError.NotFoundError(
            `No review found with id:${reviewId}`
        )
    }

    checkPermisions(req.user, review.user)

    review.rating = rating
    review.title = title
    review.comment = comment
    
    await review.save()

    res.status(StatusCodes.OK).json({review})


}

const deleteReview = async (req, res) => {
    const { id: reviewId } = req.params

    const checkReview = await ReviewModel.findOne({ _id: reviewId })

    if (!checkReview) {
        throw new CustomApiError.NotFoundError(
            `No review found with id:${reviewId}`
        )
    }

    checkPermisions(req.user, checkReview.user)

    // const review = await ReviewModel.findOneAndDelete({ _id: checkReview._id })

    await checkReview.remove()

    res.status(StatusCodes.OK).json({ msg: 'Success! review deleted' })
}

module.exports = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
}
const { StatusCodes } = require('http-status-codes')
const ProductModel = require('../models/product-model')


const createProduct = async(req, res) => {

    const {userId} = req.user
    // create user Property on req.body
    req.body.user = userId

    // create a new product doc
    const product = await ProductModel.create(req.body)

    // send response
    res.status(StatusCodes.CREATED).json({product})
}


const getAllProducts = async(req, res) => {
    const products = await ProductModel.find({})
    res.status(StatusCodes.OK).json({products})
}


const getSingleProduct = async(req, res) => {
    res.send("Get single product")
}

const updateProduct = async(req, res) => {
    res.send("Update product")
}

const deleteProduct = async(req, res) => {
    res.send("Delete Products")
}


const uploadProductImage = async(req, res) => {
    res.send("upload product imae")
}


module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage
}
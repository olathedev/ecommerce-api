const { StatusCodes } = require('http-status-codes')
const ProductModel = require('../models/product-model')
const customError = require('../errors/custom-errors')
const validateProduct = require('../validators/product-validator')


const createProduct = async(req, res) => {

    const {userId} = req.user

    // validate req.body

    const {error} = validateProduct(req.body)

    if(error) {
        throw new customError.BadRequest(error)
    }

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
   const {id} = req.params

   const product = await ProductModel.findOne({_id: id})

   if(!product) {
    throw new customError.NotFoundError("No product found with this ID")
   }

   res.status(StatusCodes.OK).json({product})

}

const updateProduct = async(req, res) => {
    const {id} = req.params

    const product = await ProductModel.findOneAndUpdate({_id: id}, req.body, {new: true, runValidators: true})

    if(!product) {
        throw new customError.NotFoundError("No product found with this ID")
    }

    res.status(StatusCodes.OK).json({product})
}

const deleteProduct = async(req, res) => {
    const {id} = req.params

    const product = await ProductModel.findOneAndDelete({_id: id})
 
    if(!product) {
     throw new customError.NotFoundError("No product found with this ID")
    }

   

    res.status(StatusCodes.OK).json({msg: "Product successfully deleted"})
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
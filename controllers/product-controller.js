const ProductModel = require('../models/product-model')


const createProduct = async(req, res) => {
    res.send("create product")
}


const getAllProducts = async(req, res) => {
    res.send("Get all products")
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
const express = require('express')
const { getAllProducts,
        getSingleProduct,
        updateProduct,
        deleteProduct,
        uploadProductImage,
        createProduct
     } = require('../controllers/product-controller')


const { authenticateUser,
        authorizePermisions
     } = require('../middlewares/auth')

const { getSingleProductReviews } = require('../controllers/reviews-controller')

const router = express.Router()

// unprotected routes
router
    .route('/')

    .get(getAllProducts)

    .post([authenticateUser, authorizePermisions('admin'), createProduct])


router
    .route('/uploadImage').post([authenticateUser, authorizePermisions('admin'), uploadProductImage])


router
    .route('/:id')

    .get(getSingleProduct)

    .patch([authenticateUser, authorizePermisions('admin'), updateProduct])

    .delete([authenticateUser, authorizePermisions('admin'), deleteProduct])


router.route('/:id/reviews').get(getSingleProductReviews)

module.exports = router
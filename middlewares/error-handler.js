const { StatusCodes } = require("http-status-codes")

const errorHandler = (err, req, res, next) => {
    
    const customError = {
        msg: err.message || "internal sever Error",
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    }

    if(err.code && err.code === 11000) {
        customError.msg = `${Object.keys(err.keyValue)} already exists`
        customError.statusCode = StatusCodes.BAD_REQUEST
    }

    if(err.name === 'CastError' && err.kind === 'ObjectId') {
        customError.msg = `${err.value} is not a valid id`
        customError.statusCode = StatusCodes.NOT_FOUND
    }
    
    res.status(customError.statusCode).json({message: customError.msg})
    // res.status(customError.statusCode).json({err})


}

module.exports = errorHandler
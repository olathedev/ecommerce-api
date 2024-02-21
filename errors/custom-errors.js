const { StatusCodes } = require("http-status-codes")

class CustomApiError extends Error {
    constructor(message) {
        super(message)
    }
}

class BadRequest extends CustomApiError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

class NotFoundError extends CustomApiError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}


class UnAuthorizedError extends CustomApiError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = {
    BadRequest,
    NotFoundError,
    UnAuthorizedError
}
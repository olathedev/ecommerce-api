require('express-async-errors')
require('dotenv').config()

// express setup
const express = require('express')
const app = express()

// db connection
const connect = require('./db/connection')

// Middlewares
const morgan = require('morgan')
const cors = require('cors')
const notFound = require('./middlewares/not-found')
const errorHandler = require('./middlewares/error-handler')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

// Routes
const authRoutes = require('./routes/auth-routes')
const userRoutes = require('./routes/user-routes')
const productRoutes = require('./routes/product-routes')
const reviewRoutes= require('./routes/review-routes')
const orderRoutes = require('./routes/order-routes')
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static('./public'))
app.use(fileUpload())

app.get('/', (req, res) => {
    console.log(req.signedCookies);

    res.send("Test route")
})

// routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/reviews', reviewRoutes)
app.use('/api/v1/orders', orderRoutes)



app.use(notFound)
app.use(errorHandler)

const start = async () => {
    try {
        await connect(process.env.MONGO_URI)
        app.listen(process.env.PORT, () => console.log(`app listening on port ${process.env.PORT}`))
    } catch (error) {
        console.log(error.message);
    }
}

start()
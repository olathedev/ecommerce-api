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

// Routes
const authRoutes = require('./routes/auth-routes')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())



// routes
app.use('/api/v1/auth', authRoutes)

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
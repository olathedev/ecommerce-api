
const notFound = (req, res) => {
    res.status(404).json({messgae: `${req.originalUrl} Not found`})
}

module.exports = notFound
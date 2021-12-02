require('dotenv').config()

// eslint-disable-next-line no-undef
const { PORT, MONGODB_URI } = process.env

module.exports = { PORT, MONGODB_URI }
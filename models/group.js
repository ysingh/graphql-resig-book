require('dotenv').config()
const mongoose = require('mongoose')

const { MONGO_URL } = process.env

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const GroupSchema = new mongoose.Schema({
  _id: String,
  name: String
})

const Group = mongoose.model('Group', GroupSchema)

module.exports = { Group }

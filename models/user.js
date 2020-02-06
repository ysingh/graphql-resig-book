require('dotenv').config()
const mongoose = require('mongoose')
const { Group } = require('./group')

const { MONGO_URL } = process.env

mongoose.connect(MONGO_URL, { useNewUrlParser: true, dbName: 'yudi-test' })

const UserSchema = new mongoose.Schema({
  _id: String,
  username: String,
  groupId: String
})

UserSchema.methods.group = function () {
  return Group.findById(this.groupId).exec()
}

const User = mongoose.model('User', UserSchema)

module.exports = { User }

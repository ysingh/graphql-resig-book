const express = require('express')
const mongoose = require('mongoose')
const { User } = require('./models/user')
const { Group } = require('./models/group')

const app = express()

const defaultFields = ['_id', 'username', 'group']

const filterFields = async (req, user) => {
  const fieldKeys = req.query.fields ? req.query.fields.split(',') : defaultFields
  const filteredUser = {}

  for (const field of fieldKeys) {
    if (typeof user[field] === 'function') {
      filteredUser[field] = await user[field]()
    } else {
      filteredUser[field] = user[field]
    }
  }
  return filteredUser
}

app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).end()
    }
    res.send(await filterFields(req, user))
  } catch (e) {
    return res.status(500).end()
  }
})

app.get('/users', async (req, res, next) => {
  try {
    const users = await User.find({})
    res.send(await Promise.all(users.map(user => filterFields(req, user))))
  } catch (e) {
    console.log(e)
    res.status(500).end()
  }

})

app.listen(8080, () => console.log('Example app listening on port 8080!'))

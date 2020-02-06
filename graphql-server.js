const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')
const express = require('express')
const { User } = require('./models/user')
const { Group } = require('./models/group')

const app = express()

app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
      type Group {
        _id: String
        name: String
      }

      type User {
        _id: String
        username: String
        group: Group
      }

      type Query {
        user(id: String!): User
        users: [User]
        group(id: String!): Group
        groups: [Group]
      }
    `),
    rootValue: {
      user ({ id }) {
        return User.findById(id)
      },
      users () {
        return User.find({})
      },
      group ({ id }) {
        return Group.findById(id)
      },
      groups () {
        return Group.find({})
      }
    },
    graphiql: true
  })
)

app.listen(8080, () => console.log('App listening on 8080'))

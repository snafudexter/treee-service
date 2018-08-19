const  { user } = require('./user')
const { misc } = require('./misc')

module.exports = {
    queries: {
      ...user,
      ...misc,
    }
  }
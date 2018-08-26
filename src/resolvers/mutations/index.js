const  { user } = require('./user')

module.exports = {
    mutations: {
      ...user,
    }
  }
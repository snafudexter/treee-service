const { queries } = require('./queries')
const { mutations } = require('./mutations')
//const { AuthPayload } = require('./AuthPayload')

module.exports = {
  Query: {
    ...queries  
  },
  Mutation: {
    ...mutations
  }
  //AuthPayload,
}
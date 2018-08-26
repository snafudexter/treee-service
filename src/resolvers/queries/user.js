//const { getUserId, Context } = require('../../utils')

const user = {
  getUser(parent, { id }, ctx, info) {
    //const userId = getUserId(ctx);   
      return ctx.db.query.user({ where: { id } },info); 
  },




}

module.exports = { user }
//const { getUserId, Context } = require('../../utils')

const user = {
  getUser(parent, { id }, ctx, info) {
    //const userId = getUserId(ctx);   
      return ctx.db.query.user({ where: { id } },info); 
  },

  async confirmOTP(parent, { id, otp }, ctx, info) {
    //const userId = getUserId(ctx);   
      var user = await ctx.db.query.user({ where: { id } },`{
        id
        tPass
      }`); 

      if(otp === tPass)
      {
        return ctx.db.query.user({ where: { id } }, info);
      }
      else{
        throw new Error(`Wrong OTP`)
      }
  },

  signup(parent, {name, email, phone }, ctx, info)
    {
        console.log('mut')
        return ctx.db.mutation.createUser({data:{name, email, phone, tPass: 1234}}, info);
    },

}

module.exports = { user }
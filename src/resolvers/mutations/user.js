const user = {
    async register(parent, {name, email, phone }, ctx, info)
    {
        var user = await ctx.db.query.user({where:{email}})
        if(user)
            throw new Error(`Email Already Registered`)
        var user = await ctx.db.query.user({where:{phone}})
        if(user)
            throw new Error(`Mobile Already Registered`)
        
        return ctx.db.mutation.createUser({data:{name, email, phone, tPass: 1234}}, info);
    },

    updateUserData(parent, {id, age, gender, qualification, tutoringExp, profession, classesTaught, pricePerAnnum}, ctx, info)
    {
        return ctx.db.mutation.updateUser({where:{id}, data:{age, gender, tutoringExp, qualification:{connect:{id: qualification}},profession:{connect:{id:profession}}, classesTaught:{connect: {id: classesTaught}}, pricePerAnnum}}, info);

    },

}

module.exports = { user }
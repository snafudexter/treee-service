const user = {
    signup(parent, {name, email, phone }, ctx, info)
    {
        console.log('mut')
        return ctx.db.mutation.createUser({data:{name, email, phone, tPass: 1234}}, info);
    },

    updateUserData(parent, {id, age, gender, qualification, tutoringExp, profession, classesTaught, pricePerAnnum}, ctx, info)
    {
        return ctx.db.mutation.updateUser({where:{id}, data:{age, gender, tutoringExp, qualification:{connect:{id: qualification}},profession:{connect:{id:profession}}, classesTaught:{connect: {id: classesTaught}}, pricePerAnnum}}, info);

    },

    login(parent, args, ctx, info)
    {
        console.log('yo')
    }
}

module.exports = { user }
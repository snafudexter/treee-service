const misc = {

    getProfessions(parent, args, ctx, info)
    {
        return ctx.db.query.professions({}, info);
    },

    getQualifications(parent, args, ctx, info)
    {
        return ctx.db.query.qualifications({}, info)
    },

    getClasses(parent, args, ctx, info)
    {
        return ctx.db.query.classes({}, info)
    },

    login(parent, args, ctx, info)
    {
        console.log('yo')
    }
 
}

module.exports = { misc }
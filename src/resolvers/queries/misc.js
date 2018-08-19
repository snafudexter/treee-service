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
    }
 
}

module.exports = { misc }
var axios = require('axios');

const user = {
    async register(parent, {name, email, phone }, ctx, info)
    {
        var user = await ctx.db.query.user({where:{email}})
        if(user)
            throw new Error(`Email Already Registered`)
        var user = await ctx.db.query.user({where:{phone}})
        if(user)
            throw new Error(`Mobile Already Registered`)

        var apiKey = "AOyDRLOVLKI-qvWXro1VaEyeV8H9m7OfxfWb5Ez6yt";
        var baseUrl = "https://api.textlocal.in/send/?";
        var sender = "TXTLCL"    

        var val = Math.floor(1000 + Math.random() * 9000);
        var data = "apikey=" + apiKey + "&numbers=91" + phone + "&sender=" + sender + "&message=" + val;

        await axios.get(baseUrl+data)
        return ctx.db.mutation.createUser({data:{name, email, phone, tPass: val}}, info);
    },

    updateUserData(parent, {id, age, gender, qualification, tutoringExp, profession, classesTaught, pricePerAnnum}, ctx, info)
    {
        return ctx.db.mutation.updateUser({where:{id}, data:{age, gender, tutoringExp, qualification,profession:{connect:{id:profession}}, classesTaught:{connect: {id: classesTaught}}, pricePerAnnum}}, info);

    },

    async confirmOTP(parent, { id, otp }, ctx, info) {
    //const userId = getUserId(ctx);   
        var user = await ctx.db.query.user({ where: { id } },`{
        id
        tPass
        }`); 

        if(otp === user.tPass)
        {
        return ctx.db.query.user({ where: { id } }, info);
        }
        else{
        throw new Error(`Wrong OTP`)
        }
    },

}

module.exports = { user }
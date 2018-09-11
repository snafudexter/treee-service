var axios = require('axios');
var shortid = require('shortid');

const user = {
    async register(parent, {name, email, phone, refferal }, ctx, info)
    {
        var user = await ctx.db.query.user({where:{email}})
        if(user.confirmed)
            throw new Error(`Email Already Registered`)
        var user = await ctx.db.query.user({where:{phone}})
        if(user.confirmed)
            throw new Error(`Mobile Already Registered`)

        var apiKey = "AOyDRLOVLKI-qvWXro1VaEyeV8H9m7OfxfWb5Ez6yt";
        var baseUrl = "https://api.textlocal.in/send/?";
        var sender = "TREEIN"    


        var val = Math.floor(1000 + Math.random() * 9000);
        var data = "apikey=" + apiKey + "&numbers=91" + phone + "&sender=" + sender + "&message=" + `Your OTP for registering with Tree Enterprises is ${val}. Please DO NOT share this with anyone.`;

        await axios.get(baseUrl+data)

        if(refferal)
            return ctx.db.mutation.upsertUser({where: {phone},update:{name, email, phone, tPass: val, refferal: {connect: {code: refferal}}},create:{name, email, phone, tPass: val}}, info);
        else    
            return ctx.db.mutation.upsertUser({where: {phone},update:{name, email, phone, tPass: val},create:{name, email, phone, tPass: val}}, info);

    },



    async updateUserData(parent, {id, age, gender, qualification, tutoringExp, profession, classesTaught, pricePerAnnum}, ctx, info)
    {
        for(var i = 0; i < classesTaught.length; i++)
        {
            await ctx.db.mutation.updateUser({where:{id}, data:{classesTaught:{connect: {id: classesTaught[i]}}}}, info);

        }

        shortid.characters('abcdefghijklmnopqrstuvwxyz#@ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
        var code = shortid.generate();

        while(true){
            var users = await ctx.db.query.users({where:{refferal:{code}}});
            
            if(users.length > 0)
            {
                code = shortid.generate();
            }
            else{
                break;
            }
        }
        return ctx.db.mutation.updateUser({where:{id}, data:{refferal:{create: [code]}, age, gender, tutoringExp, qualification,profession:{connect:{id:profession}}, pricePerAnnum, confirmed: true}}, info);
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

    async resendOTP(parent, { id }, ctx, info) {
        //const userId = getUserId(ctx);   
            var user = await ctx.db.query.user({ where: { id } },`{
            id
            tPass
            phone
            }`); 
    
            var apiKey = "AOyDRLOVLKI-qvWXro1VaEyeV8H9m7OfxfWb5Ez6yt";
            var baseUrl = "https://api.textlocal.in/send/?";
            var sender = "TREEIN"    

            var data = "apikey=" + apiKey + "&numbers=91" + user.phone + "&sender=" + sender + "&message=" + `Your OTP for registering with Tree Enterprises is ${user.tPass}. Please DO NOT share this with anyone.`;

            await axios.get(baseUrl+data)
            return ctx.db.query.user({ where: { id } },`{
                id
                }`); 
        },

}

module.exports = { user }
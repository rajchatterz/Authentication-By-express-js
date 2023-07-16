const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Username is required'],
        minLength:[5,'Name must be in 5 char'],
        maxLength:[50,'Name must be in 5 to 50 char'],
        trim:true
    },
    email:{
        type:String,
        required:[true,'Username is required'],
        unique:true,
        lowercase:true,
        unique:[true,'already resisterd']
    },
    password:{
        type:String,
        select:false
    },
    forgotPasswordToken:{
        type:String
    },
    forPasswordExpiry:{
        type:Date
    }
},{
    timestamps:true
});

userSchema.methods={
    // to define a cookie
    jwtToken(){
        return JWT.sign(
            {id: this._id, email: this.email},
            process.env.SECRET,
            {expiresIn: '24h'}
        )
    }
}
module.exports=mongoose.model("user",userSchema)

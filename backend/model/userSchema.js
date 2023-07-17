const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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
userSchema.pre("save", async(next)=>{
    if(!this.ismodified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password,10)
    return next()
})
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

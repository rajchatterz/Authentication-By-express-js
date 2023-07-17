const userSchema = require("../model/userSchema")
const emailValidator = require('email-validator')
const bcrypt = require('bcrypt')
const signup = async (req,res)=>{
    const {name,email,password,confirmPassword} = req.body
    console.log(name,email,password,confirmPassword)

    // validation
    if(!name || !email || !password || !confirmPassword){
        return res.status(400).json({
            success:false,
            message:'Every field is required'
        })
    }
    const validEmail = emailValidator.validate(email)
    if(!validEmail){
        return res.status(400).json({
            success:false,
            message:'Please provide a valid email id'
        })
    }
    if(!user || bcrypt.compare(password,user.password)){
        return res.status(400).json({
            success:false,
            message:'Password and confirmpassword doesnt match'
        })
    }
    
    try {
        
        const userInfo = userSchema(req.body)
    
        const result = await userInfo.save()
        return res.status(200).json({
            success:true,
            data:result
        })
    } catch (error) {
        // for handling the duplicate entry
        if(error.code ===11000){
            return res.status(400).json({
                success:false,
                message:'Account already created with provided emial id'
            })
        }
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

const signin = async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Every field is mandatory"
        })
    }
    try {
        const user = await userSchema
        // will check the database wheather this email is exist or not if yes then wil give the password along side of the email
        .findOne({
            email
        })
        .select('+password')
        if(!user || user.password!==password){
            return res.status(400).json({
                success:false,
                message:"Invalid cred"
            })
        }
        // we need to access the token
        const token = user.jwtToken()
        user.password=undefined

        const cookieOption ={
            maxAge:24*60*60*1000,
            httpOnly:true
        }
        res.cookie("token",token,cookieOption)
        res.status(200).json({
            success:true,
            data:user
        })

        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
    
}
const getUser=async(req,res)=>{
    //to get the user info
    const userId = req.user.id;


    try {
        const user = await userSchema
        // find the user regarding to the userid
        .findById(userId)
        return res.status(200).json({
            success:true,
            data:user
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
const logout = (req,res)=>{
    try {
        const cookieOption = {
            expired: new Date(),
            httpOnly:true
        }
        req.cookie("token",null,cookieOption)
        return res.status(200).json({
            success:true,
            message:"Logged out"
        })
    } catch (error) {
        res.status(401).json({
            success:false,

        })
    }
}

module.exports={
    signup,
    signin,
    getUser,
    logout
}
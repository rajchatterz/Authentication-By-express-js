const JWT = require('jsonwebtoken')

const jWtAuth=(req,res,next)=>{
    // we need to reetrive the cookies
    const token = (req.cookies && req.cookies.token) ||null
    // next will transfer the data from jwtauth to controller
    if(!token){
        return res.status(400).json({
            success:false,
            message:"Token does not exist"
        })
    }
    try {
        const payload = JWT.verify(token,process.env.SECRET)
        req.user = {id:payload.id,email:payload.email}
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"not authorize"
        })
    }
    next() //next allow us to go from one process to another porcess

}

module.exports=jWtAuth
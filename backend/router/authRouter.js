const express = require('express')
const {signup,signin,getUser} = require('../controller/authController')
const jWtAuth = require('../middleware/jwtAuth')

const authRouter = express.Router()

authRouter.post('/signup',signup)
authRouter.post('/signin',signin)
authRouter.get('/user',jWtAuth,getUser)// router first will visit to jwtAuth then it will move to the next part.
// jwtAuth will help us to autheticate the value
module.exports=authRouter
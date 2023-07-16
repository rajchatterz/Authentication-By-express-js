
const express = require('express')
const app = express()
// Router Connection
const authRoute = require('./router/authRouter')
// Db init
const databaseConnection = require('./config/dataConfig')
// cookie parse
const cookieparser = require('cookie-parser')

// db call
databaseConnection();

app.use(express.json())

app.use(cookieparser())
app.use('/api/auth/',authRoute)
app.use('/',(req,res)=>{
    res.status(200).json({
        data:"jWtAuth server"
    })
})
module.exports=app
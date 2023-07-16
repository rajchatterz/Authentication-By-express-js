const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URL 

const connectToDb = async ()=>{
    try {
        mongoose.connect(MONGO_URI)
        .then((con)=>{
            console.log(`Connceted to the DB ${con.connection.host}`)
        }).catch(error=>console.log(error))
        
    } catch (error) {
        console.error("Found an error while fetch the data",error);
    }
}

module.exports=connectToDb
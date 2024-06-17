const mongoose = require("mongoose")

const mongoURI = "mongodb://localhost:27017/iNotebook"

const ConnectToMongo = ()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("MongoConnect Successfully")
    })
}

module.exports = ConnectToMongo
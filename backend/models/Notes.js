const mongoose = require ("mongoose")

const NotesSchema = new mongoose.Schema({

    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
title:{
    type:String,
    require:true
},
description:{
    type:String,
    require:true
},
tag:{
    type:String,
    
},
date:{
    type:Date,
    default:Date.now
},
})

const notes = mongoose.model("notes",NotesSchema)

module.exports = notes
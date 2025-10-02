const mongoose = require("mongoose");

const chatScema= new mongoose.Schema({
title:{
    type:String,
    maxLength:100
},
description:{
   type:String, 
},
categories:{
    type:String,
     enum: ["Personal", "Work", "Study", "Travel", "Ideas"], required: true
},
created_at:{
type:Date,
required:true
}
})     
const Chat = mongoose.model("Chat",chatScema);
module.exports=Chat;
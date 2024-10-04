import mongoose from "mongoose"

const messageModel=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        requred:true
    }
},{timestamps:true})

export const MessageModel=mongoose.model(" MessageModel",messageModel)
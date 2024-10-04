import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import {AsyncHandler} from "../utils/AsyncHandler.js"
import {MessageModel} from "../models/user_message.model.js"

// send message   ----> users
const user_message=AsyncHandler(async(req,res)=>{
    const {name,email,message}=req.body
    if(!name){
        throw new ApiError(500,"name is required!")
    }
    if(!email){
        throw new ApiError(500,"name is email!")
    }
    if(!message){
        throw new ApiError(500,"name is message!")
    }
    const isMessageExist=await MessageModel.findOne({message})
    console.log("messageAlready",isMessageExist)
    if(isMessageExist){
        throw new ApiError(500,"message already exist!")
    }
    const user=await MessageModel.create({
        name,
        email,
        message
    })
    if(!user){
        throw new ApiError(500,"message not created!")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,user,"message send successfully"))

})

// get messages  .---->Admin
const getMessage=AsyncHandler(async(req,res)=>{
   const messages=await MessageModel.find()
   if(!messages){
    throw new ApiError(404,"message not found!")
   }
   return res
   .status(200)
   .json(new ApiResponse(200,messages,"messages fetched successfully"))
})

// count All messagess  ---->Admin
const countMessages=AsyncHandler(async(req,res)=>{
    const allMessages=await MessageModel.countDocuments()
    if(!allMessages || allMessages.length===0 ){
       throw new ApiError("403","no messages availble")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,allMessages,"messagess counted successfully"))
})

// delete user message --->Admin
const deleteUserMessage=AsyncHandler(async(req,res)=>{
    const messageId=req.params?._id
    //console.log("messageid",messageId)
    if(!messageId){
        throw new ApiError(500,"Message Id not found")
    }
    const deletedMessage=await MessageModel.deleteOne({_id:messageId})
    return res
    .status(200)
    .json(new ApiResponse(200,deletedMessage,"message deleted successfully"))
})

export {
    user_message,
    getMessage,
    countMessages,
    deleteUserMessage
}
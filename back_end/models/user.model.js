import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"userName is required"],
        maxLength:[30,"user name not exceed more then 30 character"]
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"USER"
    },
    profilePic:String,
    accessToken:String,
    refreshToken:String,
    profilePic:String
},{timestamps:true})


userSchema.pre("save",async function(next){
   if(!this.isModified("password")) return next()
    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect=async function(password){
    return  await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken= function(){
    return jwt.sign(
        {
            _id:this._id,
            userName:this.userName,
            email:this.email
        },
        
        process.env.ACCESS_TOKEN_SCREAT,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
       
    )
}

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

 export const User=mongoose.model("User",userSchema)
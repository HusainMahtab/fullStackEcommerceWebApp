import mongoose from "mongoose";

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("DB connected successfully")
    } catch (error) {
        console.error("DB not connected",error)
    }
}

export  default connectDb
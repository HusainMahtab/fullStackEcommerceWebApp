import mongoose from "mongoose"

const orderSchema=new mongoose.Schema({
    product:[
        {
          productId:{
             type:mongoose.Schema.Types.ObjectId,
             ref:"Product",
             required:true
           },
          productName:{
             type:String,
           },
          productImage:[{
             type:String,
             ref:"Product",
             required:true
           }], 
        }  
    ],
    customerName:{
        type:String,
        required:true
    },
    customerAddress:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    quantity:{
         type:Number,
         required:true,   
         default:1
     }, 
},{
    timestamps:true
})

export const Order=mongoose.model("Order",orderSchema)
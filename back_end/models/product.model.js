import mongoose from "mongoose"

const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:[true,"productName is required"],
    },
    brandName:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:[true,"category is required"]
    },
    description:{
        type:String,
        required:[true,"description is required"]
    },
    price:{
        type:Number,
        required:[true,"price is required"]
    },
    productImage:[
        {
            type:String,
            required:[true,"please upload image"]
        }
    ],
    sellingPrice:{
        type:Number,
    }, 
    stock:{
        type:Number,
        required:true,
        default:1
    },
    ratings:{
        type:Number,
        default:0
    },
    numOfReviews:{
        type:String,
        default:0
    },
    productComments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            },
            userName:{
                type:String,
                required:true,
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    productRating:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            },
           userName:{
            type:String,
            required:true
           },
           rating:{
            type:Number,
            required:true,
           }
        }
    ],
    productLike:[
       {
           user:{
              type:mongoose.Schema.Types.ObjectId,
              ref:"User",
              required:true
           },
           userName:{
              type:String,
              required:true
           },
           like:{
             type:Boolean,
             default:false
           }
       }
    ]


    
},{timestamps:true})

export const Product=mongoose.model("Product",productSchema)



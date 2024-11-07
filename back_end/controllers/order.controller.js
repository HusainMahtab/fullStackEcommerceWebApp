import { Order } from "../models/order.model.js";
import {AsyncHandler} from "../utils/AsyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

// user order  
const createOrder=AsyncHandler(async(req,res)=>{
  const {
    product,
    customerName,
    customerAddress,
    quantity,
    phoneNumber,
    paymentMethods,
  }=req.body
  console.log("orderdata",product,customerName,customerAddress,phoneNumber)
  if(!product){
    throw new ApiError(404,"product is required!")
  }
  if(!customerName){
    throw new ApiError(404,"customerName is required!")
  }
  if(!customerAddress){
    throw new ApiError(404,"customerAddress is required!")
  }
  if(!phoneNumber){
    throw new ApiError(404,"phoneNumber is required!")
  }
  if(!paymentMethods){
    throw new ApiError(404,"paymentMethods is required!")
  }

  const order=await Order.create({
    product,
    customerName,
    customerAddress,
    phoneNumber,
    quantity,
    paymentMethods
  })

  if(!order){
    throw new ApiError(500,"order not created!")
  }
  return res
  .status(200)
  .json(new ApiResponse(200,order,"order created successfully"))

})

// all orders --->ADMIN
const allOrders=AsyncHandler(async(req,res)=>{
    const orders=await Order.find()
    if(!orders){
        throw new ApiError(500,"orders not found")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,orders,"all orders found successfully"))
})

export {createOrder,allOrders}

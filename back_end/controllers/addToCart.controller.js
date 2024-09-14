import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AddToCart } from "../models/cartProduct.model.js";

 const addToCartProduct = AsyncHandler(async(req, res) => {
   const {productId,quantity}=req.body
   //console.log("productid",productId)
   if(!productId){
    throw new ApiError(402,"productId not found!")
   }
   const userId=req.user._id
   //console.log("currentUser",userId)
   if(!userId){
    throw new ApiError(403,"userId not found!")
   }
   let iscartItemExist=await AddToCart.findOne({productId,userId})
   //console.log("is cart exist",cartItem)
   if(iscartItemExist){
    throw new ApiError(500,"Product already Added")
   }
    const addedProduct=new AddToCart({
      productId,
      userId,
      quantity:quantity || 1
     })
     await addedProduct.save()
     return res
     .status(200)
     .json(new ApiResponse(200,addedProduct,"AddToCart successfully"))
   }
  
);


export {
    addToCartProduct
}
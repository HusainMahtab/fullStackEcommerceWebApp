import { User } from "../models/user.model.js";
import {AsyncHandler} from "../utils/AsyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import {AddToCart} from "../models/cartProduct.model.js"
import { Resend } from 'resend'; 
const resend=new Resend('re_7y3HANTo_2QmRpsXRUtCcyVYhh3csSZLa')

// generate access and refresh token
const generateAccessTokenAndRefreshToken=async(userId)=>{
    try {
        const user=await User.findById(userId)
        console.log("User:",user)
        const accessToken=user.generateAccessToken()
        //console.log("accessToken:",accessToken)
        const refreshToken=user.generateRefreshToken()
        user.refreshToken=refreshToken
        await user.save({ validateBeforeSave: false})
        return {accessToken,refreshToken}
    } catch (error) {
        console.log(error)
        throw new ApiError(500,"error while generating accessToken and refreshToken")
    }
}

// sign up users
const signUp=AsyncHandler(async(req,res,)=>{
    const {userName,email,password,profilePic}=req.body
    console.log(profilePic,userName,email,password)
    if(!userName){
        throw new ApiError(401,"userName is required")
    }
    if(!email){
        throw new ApiError(401,"email is required")
    }
    if(!password){
        throw new ApiError(404,"password is required")
    }

    const isUserExist=await User.findOne({
        email,
    })

    if(isUserExist){
        throw new ApiError(500,"user already exist")
    }

    const user=await User.create({
        userName,
        email,
        password,
        profilePic
    })
     const sendSignUpEmail = async () => {
        try {
          const response = await resend.emails.send({
            from: 'mahtabh667@gmail.com',
            to: `${email}`,
            subject: 'SignUp Mail',
            html: '<p>You are successfull signup in my project mk-commerce</p>',
          });
          console.log('Email sent:', response);
        } catch (error) {
          console.error('Error sending email:', error);
        }
      };
     sendSignUpEmail()
    //console.log("user:",user)

    if(!user){
        throw new ApiError(404,"user not created")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,user,"user created successfully"))
    
})

 // login users
 const login=AsyncHandler(async(req,res)=>{
    const {email,password}=req.body
    if(!(email && password)){
        throw new ApiError(402,"invalid email of password")
    }
    const user=await User.findOne({email})
    // console.log("User:",user)
    if(!user){
        throw new ApiError(404,"user not exist")
    }

    //console.log("user Id",user._id)
    
    const isPasswordValid=await user.isPasswordCorrect(password)
    //console.log("isPasswordvalid:",isPasswordValid)
    if(!isPasswordValid){
        throw new ApiError(500,"password of email is not valid please check!")
    }

    const {accessToken,refreshToken}=await generateAccessTokenAndRefreshToken(user._id)
    console.log("accessToken:",accessToken)
   // console.log("refreshToken:",refreshToken)
    
    const loggedInUser=await User.findById(user._id).select('-password -refreshToken')
    
    const options = {
        httpOnly: true,                   
        secure: process.env.NODE_ENV === 'production',  
        sameSite: 'None',                 
      };

    return res
    .status(200)
    .cookie("AccessToken",accessToken,{ ...options, maxAge: 604800000 })
    .cookie("RefreshToken",refreshToken,{ ...options, maxAge: 3600000 })
    .json(new ApiResponse(200,{user:loggedInUser,accessToken,refreshToken},"user loggedIn successfully"))

})


// user-profile
const user_profile_details=AsyncHandler(async(req,res)=>{
    const userDetails=await User.findById(req.user._id)
    console.log("userDetails",userDetails)
    if(!userDetails){
        throw new ApiError(401,"user details not found!")
    }
   
    return res
   .status(200)
   .json(new ApiResponse(200,userDetails,"user Profile found successfully"))
})

// logOut user
const logOut=AsyncHandler(async(req,res)=>{
     //console.log("_id",req.user._id)
     await User.findByIdAndUpdate(req.user._id,
        {
           $set:{
             refreshToken:undefined
            }
        }
     ,{new:true})

     const options={
        httpOnly:true,
        secure:true
     }
     return res
     .status(200)
     .clearCookie("AccessToken",options)
     .clearCookie("RefreshToken",options)
     .json(new ApiResponse(200,{},"you are logout successfully"))


})

// forgot password
const forgotPassword=AsyncHandler(async(req,res)=>{
    const {email,newPassword,confirmPassword}=req.body
    if(!email){
        throw new ApiError(404,"user email not found!")
    }
    if(!newPassword){
        throw new ApiError(404,"newPassword not found!")
    }
    if(!confirmPassword){
        throw new ApiError(404,"confirmPasswored not found!")
    }
    const user=await User.findOne({email})
    if(!user){
        throw new ApiError(404,"user not found")
    }
    if(newPassword!==confirmPassword){
        throw new ApiError(500,"password and confirm password is not equal")
    }
    user.password=confirmPassword
    await user.save()
    return res
    .status(200)
    .json(new ApiResponse(200,user,"Password changed successfully"))
})

// get all users
const allUser=AsyncHandler(async(req,res)=>{
    const users=await User.find()
    
    if(!users){
        throw new ApiError(404,"error while get all users!")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,users,"users get successfully"))
})

// Update user details
const updateUser=AsyncHandler(async(req,res)=>{
    const {_id,email,userName,role}=req.body

   if(!_id){
    throw new ApiError(404,"userId is required")
   }else if(!email){
    throw new ApiError(404,"email is required")
   }else if(!userName){
    throw new ApiError(404,"userName is required")
   }else if(!role){
    throw new ApiError(404,"role is required")
   }

   const updatedFields=await User.findByIdAndUpdate(_id,{
     $set:{email,userName,role}
   },{new:true})

   if(!updatedFields){
    throw new ApiError(401,"error while updating users details")
   }

   const user=await User.findById(req.user._id)
   await user.save()
   console.log("Current Role",user.role)

   return res
   .status(200)
   .json(new ApiResponse(200,updatedFields,"user detail updated successfully"))
})

// delete user
const deleteUser=AsyncHandler(async(req,res)=>{
    const userId=req?.params._id
    if(!userId){
        throw new ApiError(404,"userId not found!")
    }
    const deleted_user=await User.findByIdAndDelete(userId)
    if(!deleted_user){
        throw new ApiError(500,"user not deleted!")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,deleted_user,"user deleted successfully"))
})
 
// count add to cart products
const countAddToCartProduct=AsyncHandler(async(req,res)=>{
    const userId=req.user?._id
    if(!userId){
        throw new ApiError(403,"userId not found!")
    }
    let countProduct=await AddToCart.countDocuments({
        userId
    })
    console.log("count product",countProduct)
    if(!countProduct){
      countProduct=0  
    }
    return res
    .status(200)
    .json(new ApiResponse(200,countProduct,"add to cart product count successfully"))

})

// view add to cart product
const viewAddToCartProduct=AsyncHandler(async(req,res)=>{
    const userId=req.user?._id
    if(!userId){
        throw new ApiError(403,"userId is not found!")
    }
    
    const products=await AddToCart.find({userId}).populate('productId', 'productName description brandName category price productImage sellingPrice stock  ratings numOfReviews reviews');
    
    if(!products){
        throw new ApiError(404,"Add to cart product not found!")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,products,"View AddToCart produt find successfully"))

})

// update addToCart products 
const updateAddToCartProduct=AsyncHandler(async(req,res)=>{
   const userId=req.user._id
   if(!userId){
    throw new ApiError(403,"current user not found!")
   }
   console.log("userId",userId)
   const addToCartProductId=req.body._id
   console.log("addToCarproductid",addToCartProductId)
   if(!addToCartProductId){
      throw new ApiError(403,"addTocCart productId not found!")
   }
   const qty=req.body.quantity
   console.log("quantity",qty)

   if(!qty){
    throw new ApiError(402,"quantity not found!")
   }
   if(qty<0){
    throw new ApiError(500,"quntity never be less then 1")
   }
   const updatedProduct=await AddToCart.updateOne({_id:addToCartProductId},
      {
        ...(qty && {quantity:qty})
      },{new:true}
   )

   return res
   .status(200)
   .json(new ApiResponse(200,updatedProduct,"addToCart product updated successfully"))

})

  // Remove addToCart product 
  const removeAddToCartProduct=AsyncHandler(async(req,res)=>{
    const userId=req.user._id
    if(!userId){
       throw new ApiError(404,"current user id not found!")
    }
    const productId=req.body._id;
    console.log("productid",productId)
    if(!productId){
       throw new ApiError(404,"product id not found!")
    }
    const product=await AddToCart.deleteOne({_id: productId})
    if(!product){
       throw new ApiError(500,"product not delete in data base")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,{product},"product deleted successfully"))
  })

export {
    signUp,
    login,
    user_profile_details,
    logOut,
    allUser,
    updateUser,
    deleteUser,
    countAddToCartProduct,
    viewAddToCartProduct,
    updateAddToCartProduct,
    removeAddToCartProduct,
    forgotPassword
}


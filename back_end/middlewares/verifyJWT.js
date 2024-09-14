import { AsyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"

const authorizedUser = AsyncHandler(async (req, res, next) => {
   try {
    
     const token = req.cookies?.AccessToken || req.header("token")?.replace("Bearer ", ""); 
     console.log("token:", token);
     
     if (!token) {
       throw new ApiError(500, "Unauthorized user");
     }
 
     const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SCREAT);
     //console.log("decodedToken:",decodedToken)
     const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
     if (!user) {
       throw new ApiError(500, "Invalid AccessToken");
     }
     
     req.user = user;
     next();
   } catch (error) {
     throw new ApiError(401, error?.message || "Invalid AccessToken");
   }
 });
 

// verify user roles
const authorized_Role=(...roles)=>{
   return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            throw new ApiError(403,`Role:${req.user.role} is not allow to access this resource`)
        }
        next()
   }
}


export {authorizedUser,authorized_Role}
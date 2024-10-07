import { Router } from "express";
import { authorizedUser,authorized_Role } from "../middlewares/verifyJWT.js";
import { 
    signUp ,
    login,
    user_profile_details,
    logOut,
    allUser,
    updateUser,
    countAddToCartProduct,
    viewAddToCartProduct,
    updateAddToCartProduct,
    removeAddToCartProduct,
    forgotPassword
} from "../controllers/user.controller.js";
const router=Router()

// register user
router.route("/signup").post(signUp)

// loggedIn user
router.route("/login").post(login)

// user profile details
router.route("/profile").get(authorizedUser,user_profile_details)

// logOut user
router.route("/log_out").post(authorizedUser,logOut)

// forgot password
router.route("/forgo_password").post(forgotPassword)

// fetch all users
router.route("/all_users").get(authorizedUser,allUser)

// change users role
router.route("/update_user").put(authorizedUser,updateUser)

// count product from addtocart 
router.route("/count_addtocart_product").get(authorizedUser,countAddToCartProduct)

// view add to cart products
router.route("/view_addtocart_products").get(authorizedUser,viewAddToCartProduct)

// update addToCartProducts
router.route("/update_addtocart_product").post(authorizedUser,updateAddToCartProduct)

// delete addToCart product
router.route("/delete_addtocart_product").post(authorizedUser,removeAddToCartProduct)


export {router}
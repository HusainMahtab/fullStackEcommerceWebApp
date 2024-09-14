import { authorizedUser } from "../middlewares/verifyJWT.js";
import { addToCartProduct } from "../controllers/addToCart.controller.js";
import express from "express"
const router=express()

router.route("/addToCart").post(authorizedUser,addToCartProduct)

export default router
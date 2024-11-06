import {authorized_Role, authorizedUser} from "../middlewares/verifyJWT.js"
import {createOrder,allOrders} from "../controllers/order.controller.js"
import {Router} from "express"
const router=Router()

// create order ---> users
router.route("/order").post(authorizedUser,createOrder)

// all orders  --->Admin
router.route("/all_orders").get(authorizedUser,authorized_Role("ADMIN"),allOrders)

export default router
import {Router} from "express"
import {
    user_message,
    getMessage,
    countMessages,
    deleteUserMessage
} from "../controllers/user.message.controller.js"
import {authorized_Role,authorizedUser} from "../middlewares/verifyJWT.js"
const router=Router()

router.route("/user_message").post(user_message)
router.route("/get_all_message").get(authorizedUser,authorized_Role("ADMIN"),getMessage)
router.route("/count_all_messagess").get(authorizedUser,authorized_Role("ADMIN"),countMessages)
router.route("/delete_user_message/:_id").delete(authorizedUser,authorized_Role("ADMIN"),deleteUserMessage)

export default router

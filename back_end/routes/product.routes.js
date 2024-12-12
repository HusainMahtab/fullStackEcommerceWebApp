import {Router} from "express"
import {
    createProduct,
    updateProduct,
    getAllProducts,
    deleteProduct,
    getProductCategory,
    getCategoryWiseProduct,
    getProductDetails,
    searchProduct,
    filterProduct,
    productComment,
    getComments,
    createRatings,
    getRating,
    likeProduct,
    getallLikes
} from "../controllers/product.controller.js"
import {authorizedUser,authorized_Role} from "../middlewares/verifyJWT.js"

const router=Router()

// create product ----> ADMIN
router.route("/createProduct").post(authorizedUser,authorized_Role("ADMIN"),createProduct)

// update product ----->ADMIN
router.route("/updateProduct/:_id").put(authorizedUser,authorized_Role("ADMIN"),updateProduct)

// get all products
router.route("/allProducts").get(getAllProducts)

// delete Product ---->ADMIN
router.route("/deleteProduct/:_id").delete(authorizedUser,authorized_Role("ADMIN"),deleteProduct)

// find product Category
router.route("/getProductCategory").get(getProductCategory)

// get category wise product
router.route("/categoryProduct").get(getCategoryWiseProduct)

// get productDetails
router.route("/productDetails").post(getProductDetails)

// get search product
router.route("/search-products").get(searchProduct)

// filter product with category
router.route("/filterProduct").get(filterProduct)

// create prduct reviews
router.route("/create_comment/:_id").post(authorizedUser,productComment)

// get comment 
router.route("/get_comments/:_id").get(getComments)

// create ratings
router.route("/create_rating/:_id").post(authorizedUser,createRatings)

// get ratings
router.route("/get_rating/:_id").get(getRating)

// create like
router.route("/create_like/:_id").post(authorizedUser,likeProduct)

// get all likes
router.route("/get_all_likes/:_id").get(getallLikes)



export default router
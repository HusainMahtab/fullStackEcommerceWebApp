import {AsyncHandler} from "../utils/AsyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import { Product } from "../models/product.model.js"

//create product ----> Admin
const createProduct=AsyncHandler(async(req,res)=>{
     const {
        productName,
        brandName,
        category,
        description,
        price,
        sellingPrice,
        productImage,
        stock
    }=req.body

    if(!productName){
        throw new ApiError(500,"productName is required")
    }
    if(!brandName){
        throw new ApiError(500,"brandName is required")
    }
    if(!category){
        throw new ApiError(500,"product category is required")
    }
    if(!description){
        throw new ApiError(500,"description is required")
    }
    if(!price){
        throw new ApiError(500,"Price is required")
    }else if(price<0){
        throw new ApiError(500,"price could't Negative")
    }
    if(!sellingPrice){
        throw new ApiError(500,"selling price is required")
    }else if(sellingPrice<0){
        throw new ApiError(500,"selling price could't Negative")
    }
    if(!productImage.length){
        throw new ApiError(500,"product image is required")
    }
    if(!stock){
        throw new ApiError(500,"product stock is required")
    }

    const product=await Product.create({
        productName,
        brandName,
        category,
        description,
        price,
        sellingPrice,
        productImage,
        stock
    })
    if(!product){
        throw new ApiError(500,"product not create somthing is wrong !")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,product,"product created successfully"))
})

// Update product ---->ADMIN
const updateProduct=AsyncHandler(async(req,res)=>{
    const {
        productName,
        brandName,
        category,
        description,
        price,
        sellingPrice,
        productImage,
        stock 
    }=req.body

    if(!productName){
        throw new ApiError(500,"productName is required")
    }
    if(!brandName){
        throw new ApiError(500,"brandName is required")
    }
    if(!category){
        throw new ApiError(500,"product category is required")
    }
    if(!description){
        throw new ApiError(500,"description is required")
    }
    if(!price){
        throw new ApiError(500,"Price is required")
    }
    if(!sellingPrice){
        throw new ApiError(500,"selling price is required")
    }
    if(!productImage){
        throw new ApiError(500,"product image is required")
    }
    if(!stock){
        throw new ApiError(500,"product stock is required")
    }

    const updatedProduct=await Product.findByIdAndUpdate(req.params._id,{
         $set:{
        productName,
        brandName,
        category,
        description,
        price,
        sellingPrice,
        productImage,
        stock  
        }
    },{new:true})

    if(!updatedProduct){
        throw new ApiError(500,"product not updated")
    }
    await updatedProduct.save()

    return res
    .status(200)
    .json(new ApiResponse(200,updatedProduct,"product updated successfully"))
})

// get all products
const getAllProducts=AsyncHandler(async(req,res)=>{
     const products=await Product.find()
     if(!products){
        throw new ApiError(403,"Products not found !")
     }
     return res
     .status(200)
     .json(new ApiResponse(200,products,"products found successfull"))
})

// delete Products ---->ADMIN
const deleteProduct=AsyncHandler(async(req,res)=>{
    const product=await Product.findByIdAndDelete(req.params._id)
    if(!product){
        throw new ApiError(403,"Product not exist")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,{},"Product deleted Successfully"))
})

// get product category
const getProductCategory=AsyncHandler(async(req,res)=>{
     const productCategory=await Product.distinct("category")
     
     // array to store one product from each category
     const productByCategory=[]

     for(const category of productCategory){
        const product=await Product.findOne({category})
        if(product){
               productByCategory.push(product)
        }
     }

     return res
     .status(200)
     .json(new ApiResponse(200,productByCategory,"product find successfully"))
})

// get category wise product
const getCategoryWiseProduct=AsyncHandler(async(req,res)=>{
    const {category}=req.query
    if(!category){
        throw new ApiError("404","Category not found!")
    }
    const product=await Product.find({category})
    if(!product){
        throw new ApiError(403,"category product not exist")
    }
    if(!product.length){
        throw new ApiError(403,"not found any product in db")
    }
    //console.log("products",product)
    return res
    .status(200)
    .json(new ApiResponse(200,{product},"product category found successfully"))
    
})
    
// get product details
const getProductDetails=AsyncHandler(async(req,res)=>{
   const productId=req?.body
   if(!productId){
    throw new ApiError(403,"product id not found")
   }
   const product=await Product.findById(productId)
   if(!product){
    throw new ApiError(404,"product not exist!")
   }
   return res
   .status(200)
   .json(new ApiResponse(200,{product},"product details fetched successfully"))
})

// seach products
const searchProduct=AsyncHandler(async(req,res)=>{
    const query=req.query.q
    console.log("query",query)
    if(!query){
        throw new ApiError(500,"query not found!")
    }
    //console.log("query",query)
    const regex=new RegExp(query,"i","g")
    const product=await Product.find({
        "$or":[
            {
                productName:regex
            },
            {
                brandName:regex
            },
            {
                category:regex
            }
        ]
    })
    if(!product){
        throw new ApiError(404,"not found any product")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,{product},"product searched successfully"))
    
})

// filter products
const filterProduct=AsyncHandler(async(req,res)=>{
    const categoryList=req?.query?.category
    //console.log("categoryList",categoryList)
    if(!categoryList){
        throw new ApiError(404,"category not found!")
    }
    const product =await Product.find({
        category:{
            "$in":categoryList
        }
    })
    if(!product){
        throw new ApiError(404,"products not found!")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,product,"products found successfully"))
})

// create product reviews
const createProductReviews = AsyncHandler(async (req, res) => {
  const user = req.user._id;
  if (!user) {
    throw new ApiError(404, "User not found!");
  }
  const productId = req.params._id;
  if (!productId) {
    throw new ApiError(404, "Product ID not found!");
  }
  const { rating, comment } = req.body;
  if (!rating) {
    throw new ApiError(400, "Rating is required!");
  }
  if (!comment) {
    throw new ApiError(400, "Comment is required!");
  }
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found!");
  }
  // Check if the user has already reviewed this product
  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === user.toString()
  );
  if (alreadyReviewed) {
    throw new ApiError(400, "You have already reviewed this product!");
  }
  // Add the review
  const review = {
    user,
    userName: req.user.userName,
    rating: Number(rating),
    comment,
  };
  product.reviews.push(review);
  // Update ratings and number of reviews
  product.numOfReviews = product.reviews.length;
  product.ratings =
    product.reviews.reduce((acc, review) => acc + review.rating, 0) /
    product.reviews.length;
  // Save the product
  await product.save();
  res.status(201).json({
    success: true,
    message: "Review added successfully!",
    product,
  });
});


export {
    createProduct,
    updateProduct,
    getAllProducts,
    deleteProduct,
    getProductCategory,
    getCategoryWiseProduct,
    getProductDetails,
    searchProduct,
    filterProduct,
    createProductReviews
}


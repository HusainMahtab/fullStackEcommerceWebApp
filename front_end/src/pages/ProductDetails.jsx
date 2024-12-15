import React, { useEffect, useState,useContext } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import displayINRCurrency from "../helpers/displayCurrencyThemes"
import ShowRecommendedProduct from '../Components/ShowRecommendedProduct';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import { useNavigate } from 'react-router-dom'; 
import {useSelector} from "react-redux"
import scrollTop from '../helpers/scrollTop';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { IoStarOutline } from "react-icons/io5";
import toast from 'react-hot-toast';
import ProductComments from '../Components/ProductComments';

function ProductDetails() {
  const [data,setData]=useState({
    _id:"",
    productName:"",
    brandName:"",
    category:"",
    description:"",
    price:"",
    productImage:[],
    sellingPrice:"",
    stock:"",
    ratings:"",
    numOfReviews:"",
    productComment:[],
    productRating:[],
    productLike:[]
  })

  const initialCommentData={
    user:"",
    userName:"",
    comment:"",
  }
  const [commentData,setCommentData]=useState(initialCommentData)
  const [showAllComments,setShowAllComments]=useState([])
  const [openComment,setOpenComment]=useState(false)
  const [loading,setLoading]=useState(true)
  const params=useParams()
  const [changeImageURl,setChangeImageURl]=useState("")
  const loadingImageList=new Array(4).fill(null)
  const [zoomImageCoordinate,setZoomImageCoordinate]=useState({x:0,y:0,})
  const [showZoomImage,setShowZoomImage]=useState(false)  
  const user=useSelector(state=>state?.user?.user) 
  const navigate=useNavigate()
  const {countAddToCartItem}=useContext(Context)
  const [showMore,setShowMore]=useState(false)
  const descriptionToggleLength=100
  const [showCommentInput,setShowCommentInput]=useState(false)
  const [likeData,setLikeData]=useState({
    user:"",
    userName:"",
    like:false
  })
  const [allLikes,setAllLikes]=useState([])
  const [hoveredStar, setHoveredStar] = useState(0); 
  const [ratings, setRating] = useState(0);
  const [ratingData,setRatingData]=useState({
    user:"",
    userName:"",
    rating:""
  })

  const fetchedProductDetails=async()=>{
    try {
       const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/products/productDetails`,params,{withCredentials:true})
        //console.log("add to cart product",response)
       setData(response.data.data.product)
       //console.log("Data",data)
       setLoading(false)
    } catch (error) {
        console.error("error while post product details")
    }
}
useEffect(()=>{
  fetchedProductDetails()
  countAddToCartItem()
},[params])
useEffect(() => {
  if(data?.productImage.length) {
    setChangeImageURl(data.productImage[0])
  }
},[data])

useEffect(()=>{
   countAddToCartItem()
},[addToCart])

const handleZoomImage = (e) => {
  setShowZoomImage(true)
  const { left, top, width, height} = e.target.getBoundingClientRect();
  const x = (e.clientX - left) / (width);
  const y = (e.clientY - top) / (height);
  setZoomImageCoordinate({ x, y,});
  //console.log("coordinate", left, top, width, height);
};

const handleOutImage=()=>{
  setShowZoomImage(false)
}
const handleNavigate=(e,_id)=>{
  e?.preventDefault()
  e?.stopPropagation()
  scrollTop()
  navigate("/buy_product/"+_id)
}

const handleShowMore=()=>{
  setShowMore(!showMore)
}

const handleShowCommentInput=()=>{
  setShowCommentInput(true)
}

const handleCommentChange=(e)=>{
  const {name,value}=e.target
  setCommentData((pre)=>{
    return{
      ...pre,
      [name]:value
    }
  })
  //console.log("comment",value)
}

const handleCommentSubmit=async()=>{
  try {
    const commentResponse=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/products/create_comment/${data._id}`,commentData,{withCredentials:true})
    //console.log("comment resposnse",commentResponse)
    toast.success("comment send successfully")
    setCommentData(initialCommentData)
  } catch (error) {
    console.error("error white comment product",error)
    toast.error(error?.message)
  }
}

const getAllComments=async()=>{
  try {
    const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/products/get_comments/${data?._id}`)
    console.log("all comments",response.data.data)
    setShowAllComments(response.data?.data)
  } catch (error) {
    console.error("error while fetch product comments",error)
  }
}

useEffect(() => {
  if (data?._id) {
    getAllComments();
  }
}, [data?._id]);

const handleLikeProduct = async () => {
  try {
    setLikeData((prevState) => ({ like: !prevState.like }));
    const LikeResponse = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/products/create_like/${data._id}`,
      { like: !likeData.like }, // Sending updated like value
      { withCredentials: true }
    );
    console.log("Like response", LikeResponse);
  } catch (error) {
    console.error("Error while liking the product!", error);
  }
};


const getProductLikes=async()=>{
  try {
    const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/products/get_all_likes/${data._id}`)
    console.log("like response",response)
    setAllLikes(response.data?.data)
  } catch (error) {
    console.error("error while fetching all products likes",error)
  }
}

useEffect(()=>{
   if(data._id){
    getProductLikes()
   }
},[data?._id])

const handlePostRatings=async(value)=>{
  setRatingData(value)
  console.log("rating data",ratingData)
  try {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/products/create_rating/${data._id}`,ratingData,{withCredentials:ture})
    toast.success("rating posted successfully")
  } catch (error) {
    console.error("error while post ratings",error)
    toast.error("rating not post!")
  }
}


//console.log("data",data)
  return (
    <>
    <div className='container mx-auto p-4'>
       <div className='h-auto flex flex-col md:flex-row gap-4'>
           {/* display product image */}
           <div className='h-100 flex flex-col lg:flex-row-reverse gap-4'>
              <div className='w-[300px] h-[300px] lg:w-96 lg:h-96 relative flex justify-center items-center'>
                 {
                  loading ? (
                     <div className="h-full w-full bg-gray-400 animate-pulse"></div>
                  ) : (
                    <div className='bg-slate-100  w-[310px] h-[310px]  rounded-md '>
                       <img src={changeImageURl} alt="productImage" className='w-[340px] h-[310px] md:h-[310px] md:w-[310px] object-scale-down p-4 mix-blend-multiply' onMouseMove={handleZoomImage} style={{ cursor:`zoom-in`}} onMouseOut={handleOutImage}/>
                       {
                        showZoomImage &&(
                          <div className='hidden md:block absolute min-w-[500px] min-h-[400px] rounded-md bg-slate-100 p-1 -right-[510px] top-0'>
                           {/* Zooom product Image */}
                           <div className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-95' style={{
                           backgroundImage:`url(${changeImageURl})`,
                           backgroundRepeat:"no-repeat",
                           backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                           
                           }}>

                          </div>
                         </div>
                        )
                       }
                       
                    </div>
                   
                  )
                 }
              </div>
              <div className='h-full'>
                 {
                  loading ? (
                     <div className='flex gap-2 lg:flex-col overflow-scroll h-full scrollbar-hide'>
                       {
                        loadingImageList.map((image,index)=>(
                          
                          <div className='h-20 w-20 bg-gray-400 rounded-lg animate-pulse' key={index+1}>
                             <div className='w-full h-full object-scale-down bg-gray-400 animate-pluse'></div>
                          </div>
                          
                        ))
                       }
                      </div>
                  ) : (
                        <div>
                          <div className='flex gap-4 lg:flex-col overflow-scroll h-full scrollbar-hide'>
                            {
                              data.productImage.map((image,index)=>(
                               <div className='h-20 w-20 rounded-lg p-1 md:mt-1 mt-4 bg-slate-100 cursor-pointer hover:border-2 hover:border-gray-500' key={index+1}>
                                 <img src={image} alt="" className='w-full h-full object-scale-down mix-blend-multiply ' onMouseEnter={()=>setChangeImageURl(data?.productImage[index])}  onClick={()=>setChangeImageURl(data?.productImage[index])}/>
                               </div>
                              ))
                            }
                          </div>
                        </div>
                    )
                 }
              </div>
           </div>
           {/* display product details */}
            {
              loading ? (
             <div className='grid gap-4 h-full w-full'>
              <p className='bg-gray-400 animate-pulse rounded-full px-2 md:mt-4 mt-6 w-full h-4'></p>
              <p className='md:text-3xl bg-gray-400 rounded-full animate-pulse w-full h-4'></p>
              <p className='bg-gray-400 rounded-full animate-pulse w-full h-4'></p>
              <div className='flex items-center gap-2 py-2'>
                <p className='bg-gray-400 w-full rounded-full animate-pulse h-4'></p>
                 <div className='flex text-gray-400 animate-pulse text-2xl'>
                  <IoIosStar/>
                  <IoIosStar/>
                  <IoIosStar/>
                  <IoIosStar/>
                  <IoIosStar/>
                 </div>
              </div>
              <p className='bg-gray-400 w-full rounded-full animate-pulse h-4'></p>
              <p className='bg-gray-400 animate-pulse rounded-full w-full h-4'></p>
              <div className='flex gap-3 text-lg font-semibold'>
                <p className='bg-gray-400 w-full rounded-full animate-pulse h-4'></p>
                <p className="bg-gray-400 rounded-full animate-pulse w-full h-4"></p>
              </div>
              <div className='flex gap-2 mt-2'>
                 <button className='border-2 bg-gray-400 animate-pulse w-full rounded-lg px-3 py-2 font-bold'></button>
                 <button className='border-2 bg-gray-400 animate-pulse w-full rounded-lg px-3 py-2 font-bold'></button>
              </div>
              <div>
                <p className='bg-gray-400 animate-pulse w-full rounded-full my-1 h-4'></p>
                <p className='bg-gray-400 animate-pulse w-full rounded-full h-4'></p>
              </div>
           </div>
              ) : ( 
             <div className='grid gap-1'>
              <p className='bg-gray-200 text-gray-700 rounded-full px-2 w-fit md:mt-4 mt-6'>{data?.brandName}</p>
              <p className='md:text-3xl text-2xl font-medium'>{data?.productName}</p>
              <p className='text-slate-400'>{data?.category}</p>
              <div className='flex items-center gap-2 py-2'>
                 <div className='flex text-gray-700 text-2xl'>
                  <IoIosStar/>
                  <IoIosStar/>
                  <IoIosStar/>
                  <IoIosStar/>
                  <IoIosStarHalf/>
                 </div>
              </div>
              {/* <p>Total-Review:{data?.numOfReviews}</p> */}
              <div className='flex gap-3 text-lg font-semibold'>
                <p className='text-gray-700'>{displayINRCurrency(data.sellingPrice)}</p>
                <p className="line-through text-slate-400">{displayINRCurrency(data.price)}</p>
              </div>
              <div className='flex gap-2 mt-2'>
                 <button className='border-2 border-gray-600 bg-gray-600 hover:bg-gray-700 text-white rounded-lg px-3 py-1 font-bold' onClick={(e)=>handleNavigate(e,data?._id)}>Buy Now</button>
                 <button className='border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white rounded-lg px-3 py-1 font-bold' onClick={(e)=>addToCart(e,data._id,user)}>Add To Cart</button>
              </div>
              <div>
                <p className='text-slate-600 font-medium my-1 '>Descriptions :</p>
                <p className={showMore ? "" : "line-clamp-1"}>{data?.description}</p>
                {
                  data.description.length > descriptionToggleLength&&(
                   <span onClick={handleShowMore} className='text-blue-600 hover:underline cursor-pointer'>{showMore ? "Hide" : "show-more"}</span>
                  )
                }
              </div>
              <div className="" >
                 <div className='grid place-content-center place-items-center md:flex gap-4 justify-center items-center'>
                   <div className="flex justify-center items-center gap-2">
                      {/* Hidden checkbox */}
                      <input
                       type="checkbox"
                       id="heart-checkbox"
                       className="hidden"
                       readOnly
                     />

                   {/* Custom heart icon */}
                   <label
                    htmlFor="heart-checkbox"
                    className={`cursor-pointer text-3xl ${
                    likeData.like ? "text-red-500" : "text-black"
                    }`}
                    onClick={handleLikeProduct}
                   >
                   {likeData.like ? <FaHeart /> : <FaRegHeart />}
                   </label>
                    <h1 className="text-xl">{data?.productLike.length}</h1>
                   </div>
                  <div onClick={handleShowCommentInput} className='grid md:flex justify-center items-center gap-1 cursor-pointer'>
                      <div className='flex gap-1 justify-center items-center'>
                        <FaRegComment className='text-2xl'/>
                        <p className='text-xl font-semibold'>Comment</p>
                      </div>
                    {
                      showCommentInput&&(
                        <div className='flex justify-center items-center' >
                         <input type="text" name='comment' value={commentData.comment} onChange={handleCommentChange} placeholder='Write a comment...' autoFocus className='p-[3px] outline-none  text-lg border border-blue-600'/>
                         <div onClick={handleCommentSubmit} className='p-2 flex justify-center items-center bg-blue-600 text-white text-xl font-bold hover:bg-blue-500'>
                          <IoMdSend/>
                         </div>
                        </div>
                      )

                    }
                  </div>
                <div className="flex justify-center items-center gap-1">
                 <p className="text-xl font-semibold">Rate</p>
                <div className="flex justify-center items-center gap-2 font-bold text-xl">
                 {Array(5)
                 .fill(0)
                 .map((_, index) => (
                <div
                  key={index}
                  className={`cursor-pointer p-2 duration-500 rounded-full ${
                  index < hoveredStar || index < ratings
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-200 text-black'
                 }`}
                  onMouseEnter={() => setHoveredStar(index + 1)} // Updates hovered star
                  onMouseLeave={() => setHoveredStar(0)} // Resets hover state
                  onClick={()=>handlePostRatings(index + 1)} // Sets the rating
                >  
                <IoStarOutline />
               </div>
               ))}
              </div>
            </div>
                 </div>
              </div>
             </div>
              )
            }
       </div>
       <div>
        <h1 className='w-[100px] p-2 font-bold mt-4'>Reviews:<span className="p-2">{showAllComments.length}</span></h1>
         {
          showAllComments.length===0 ? (<div className="w-full h-[50px] p-2 shadow-md text-lg">No Comments</div>) : (
            <Link onClick={()=>setOpenComment(true)}>
                <div className="p-2 w-full bg-purple-500 rounded">
                    <div>
                      <p className='text-lg font-bold text-slate-200'>Comments {showAllComments.length}</p>
                      <div className='flex items-center gap-2'>
                        <p className='text-lg font-semibold text-white '>{showAllComments[0]?.userName}</p>
                        <p>{showAllComments[0]?.rating}</p>
                      </div>
                      <p className='text-white'>{showAllComments[0]?.comment}</p>
                    </div>
                </div>
            </Link>
          )
         } 
        
       </div>
      <div className="pt-4">
       {
        data?.category &&(
           <ShowRecommendedProduct category={data?.category} heading={"Similar products"}/>
        )
        }
      </div>
      {
        openComment&& (
          <ProductComments ProductId={data?._id} onClose={()=>setOpenComment(false)}/>
        )
      }
      
    </div>
    
    </>
  )
}

export default ProductDetails
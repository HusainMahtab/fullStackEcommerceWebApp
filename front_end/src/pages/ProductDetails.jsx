import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import displayINRCurrency from "../helpers/displayCurrencyThemes"
import ShowRecommendedProduct from '../Components/ShowRecommendedProduct';
import addToCart from '../helpers/addToCart';
import {useSelector} from "react-redux"

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
    reviews:[]
  })

  const [loading,setLoading]=useState(true)
  const params=useParams()
  const [changeImageURl,setChangeImageURl]=useState("")
  const loadingImageList=new Array(4).fill(null)
  const [zoomImageCoordinate,setZoomImageCoordinate]=useState({x:0,y:0,})
  const [showZoomImage,setShowZoomImage]=useState(false)  
  const user=useSelector(state=>state?.user?.user)  
 
  //console.log("product id ",params)

  const fetchedProductDetails=async()=>{
    try {
       const response=await axios.post(`https://fullstackecommercewebapp.onrender.com/api/v1/products/productDetails`,params,{withCredentials:true})
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
},[params])
useEffect(() => {
  if(data?.productImage.length) {
    setChangeImageURl(data.productImage[0])
  }
},[data])

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

//console.log("data",data)
  return (
    <>
    <div className='container mx-auto p-4'>
       <div className='h-[410px] flex flex-col md:flex-row gap-4'>
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
              <p>Total-Review:{data?.numOfReviews}</p>
              <p>Reviews:{data?.reviews}</p>
              <div className='flex gap-3 text-lg font-semibold'>
                <p className='text-gray-700'>{displayINRCurrency(data.sellingPrice)}</p>
                <p className="line-through text-slate-400">{displayINRCurrency(data.price)}</p>
              </div>
              <div className='flex gap-2 mt-2'>
                 <button className='border-2 border-gray-600 bg-gray-600 hover:bg-gray-700 text-white rounded-lg px-3 py-1 font-bold'>Buy Now</button>
                 <button className='border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white rounded-lg px-3 py-1 font-bold' onClick={(e)=>addToCart(e,data._id,user)}>Add To Cart</button>
              </div>
              <div>
                <p className='text-slate-600 font-medium my-1'>Descriptions :</p>
                <p>{data?.description}</p>
              </div>
             </div>
              )
            }
       </div>
      <div className="mt-96 md:mt-2">
       {
        data?.category &&(
           <ShowRecommendedProduct category={data?.category} heading={"Recommonded Product here..."}/>
        )
        }
      </div>
      
    </div>
    
    </>
  )
}

export default ProductDetails
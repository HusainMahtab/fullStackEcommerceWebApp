import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Link} from "react-router-dom"
function CategoryList() {
    const [categoryProduct,setCategoryProduct]=useState([])
    const [loader,setLoader]=useState(true)
    const loaderList=new Array(14).fill(null)
   const getCategoryProduct=async()=>{
      try {
         const response=await axios.get(`${import.meta.env.BASE_URL}/api/v1/products/getProductCategory`,{withCredentials:true})
         setCategoryProduct(response.data.data)
         setLoader(false)
         //console.log("product category",response)
      } catch (error) {
         console.log("error while fetching caregory product",error)
      }
   }

   useEffect(()=>{
     getCategoryProduct()
   },[])

  return (
    <div className='container mx-auto'>
         {
            loader ? (
              <div className='flex items-center gap-4 justify-between pt-2 overflow-scroll scrollbar-hide'>
                  {
                    loaderList.map((ele,index)=>(
                        <div key={index+1}>
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-3 flex items-center justify-center cursor-pointer">
                             <div className='bg-gray-400 w-full h-full rounded-full animate-pulse'></div>
                          </div>
                        </div>
                    ))
                   }
             </div>
             
            ) : (
             <div className='flex items-center gap-4 justify-between pt-2 overflow-scroll scrollbar-hide'>
                  {
                    categoryProduct.map((productCategory,index)=>(
                        <Link  to={"/product_category?category="+productCategory?.category} key={index+1}>
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-3 bg-slate-100 flex items-center justify-center cursor-pointer">
                            <img src={productCategory?.productImage[0]} alt={productCategory.category} className="h-full object-fill mix-blend-multiply hover:scale-125 transition-all duration-500" />
                          </div>
                          <p className='text-center text-sm md:text-base capitalize font-bold'>{productCategory?.category}</p>
                        </Link>
                    ))
                   }
             </div>
                   
            )
         }     
    </div>
  )
}

export default CategoryList
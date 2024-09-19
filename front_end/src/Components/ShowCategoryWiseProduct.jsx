import React, { useEffect, useRef,useContext} from 'react'
import { useState } from 'react'
import axios, { all } from 'axios'
import { useSelector } from 'react-redux'
import displayINRCurrency from '../helpers/displayCurrencyThemes'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import {Link} from "react-router-dom"
import addToCart from '../helpers/addToCart';
import Context from '../context'


function ShowCategoryWiseProduct({category,heading}) {
    const [product,setProduct]=useState([])
    const [loading,setLoading]=useState(true)
    const scrollElement=useRef()
    const user=useSelector(state=>state?.user?.user)
    const loadingList=new Array(14).fill(null)
    const {countAddToCartItem}=useContext(Context)
    const fetchData = async () => {
      try {
        const categoryProduct = await axios.get(`https://fullstackecommercewebapp-back-end.onrender.com/api/v1/products/categoryProduct`, {
          params: { category },
          withCredentials: true
        });
        //console.log("category product", categoryProduct.data);
        setProduct(categoryProduct.data.data.product);
        setLoading(false);
      } catch (error) {
        console.log("Error when fetching categoryProducts", error?.message);
      }
    };
    useEffect(()=>{
      fetchData()
    },[])

    const scrollRigth=()=>{
      scrollElement.current.scrollLeft+=300
    }
    const scrollLeft=()=>{
      scrollElement.current.scrollLeft-=300
    }

    const handleAddToCart=async(e,_id,user)=>{
      await addToCart(e,_id,user)
      await countAddToCartItem()
    }
  return (
    <div className='container my-2 mx-auto relative'>
        <h2 className="text-2xl font-semibold py-3">{heading}</h2>
        {
          loading ? (
            <div className="flex items-center gap-2 md:gap-6 overflow-scroll overflow-y-hidden scrollbar-hide scroll-smooth transition-all" ref={scrollElement}>    
              {
                loadingList.map((ele,index)=>(
                  <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px shadow-lg h-44 rounded-lg flex mb-4 py-2" key={index+1}>
                    <div className="bg-gray-400 h-full mx-4 p-6 rounded-xl min-w-[120px] md:min-w-[145px] animate-pulse">

                    </div>
                    <div className="">
                       <div className='w-full flex justify-between items-center'>
                          <h2 className='bg-gray-400 w-20 h-4 rounded-full animate-pulse'></h2>
                          <div className='w-8 h-8 mx-4 rounded-full bg-gray-400 text-white flex justify-center items-center animate-pulse'>
                           
                          </div> 
                       </div>                      
                       <p className="w-20 h-4 bg-gray-400 rounded-full animate-pulse"></p>
                       <div className='flex gap-3 my-2'>
                          <p className='w-14 h-4 rounded-full bg-gray-400 animate-pulse'></p>
                          <p className='w-14 h-4 rounded-full bg-gray-400 animate-pulse'></p>
                       </div>
                       <button className='px-3 py-1 bg-gray-400 rounded-full animate-pulse h-6 w-[90px]'></button>
                       <button className='px-3 py-1 my-2 bg-gray-400 rounded-full w-[90px] h-6 animate-pulse'></button>
                    </div>
                  </div>
                ))
              }
            
            </div>
          ) : (
            <div className="flex items-center gap-2 md:p-4 md:gap-6 overflow-scroll overflow-y-hidden scrollbar-hide scroll-smooth transition-all" ref={scrollElement}>
             <button className="bg-white rounded-full hover:bg-slate-300 absolute left-0 text-2xl p-1 shadow-lg hidden md:block" onClick={scrollLeft}><FaAngleLeft/></button>
             <button className="bg-white rounded-full hover:bg-slate-300 absolute right-0 text-2xl p-1 shadow-lg hidden md:block" onClick={scrollRigth}><FaAngleRight/></button>    
              {
                product.map((ele,index)=>(
                  <Link to={"product/"+ele?._id} className="w-full min-w-[290px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white shadow-lg h-48 rounded-lg flex mb-4 py-2 md:mx-1 mx-2" key={index+1}>
                    <div className=" bg-slate-100 h-full mx-4 p-6 rounded-lg min-w-[120px] md:min-w-[145px]">
                         <img className="object-scale-down h-full w-full hover:scale-125 transition-all duration-500 mix-blend-multiply" src={ele.productImage[0]}/>
                    </div>
                    <div className="">
                       <div className='w-full flex justify-evenly items-center'>
                          <h2 className='text-lg md:font-medium font-base text-ellipsis line-clamp-1 text-black'>{ele?.productName}</h2>
                          <div className='w-8 h-8 rounded-full bg-gray-600 text-white p-[18px] mx-1 flex justify-center items-center text-xs'>
                            <p className='font-bold grid place-items-center'>{Math.round(((ele?.price-ele.sellingPrice)/ele?.price)*100)}%<p>OOF</p></p>
                          </div> 
                       </div>                      
                       <p className="capitalize text-slate-500">{ele?.category}</p>
                       <div className='flex gap-3 mr-4'>
                          <p className='font-medium text-blue-600'>{displayINRCurrency(ele.sellingPrice)}</p>
                          <p className='text-slate-500 md:text-sm line-through'>{displayINRCurrency(ele?.price)}</p>
                       </div>
                       <div className="grid gap-2 py-2">
                         <button className='border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white rounded-lg px-3 py-1 font-bold w-[116px]' onClick={(e)=>handleAddToCart(e,ele?._id,user)}>Add to Cart</button>
                         <button className='border-2 border-gray-600 bg-gray-600 text-white hover:bg-gray-700 rounded-lg px-3 py-1 font-bold w-[115px]'>Buy Now</button>
                       </div>
                    </div>
                  </Link>
                ))
              }
            
            </div>
          )
        }
    </div>
  )
}

export default ShowCategoryWiseProduct
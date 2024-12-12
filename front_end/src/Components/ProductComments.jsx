import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaRegWindowClose } from "react-icons/fa";
function ProductComments({ProductId,onClose}) {
    const [commentData,setCommnetData]=useState([])
    const fetchComments=async()=>{
          try {
              const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/products/get_comments/${ProductId}`)
              console.log("all comments",response.data.data)
              setCommnetData(response.data?.data)
          } catch (error) {
            console.error("error while fetch product comments",error)
         }
    }
    useEffect(()=>{
        fetchComments()
    },[])
  return (
    <div className=' w-full h-[110vh] flex justify-center fixed top-0 left-0 p-20 right-0 bottom-0 bg-slate-200 bg-opacity-80 z-50"'>
      <div>
       <div className='flex justify-between '>
          <p className='text-lg font-bold'>All Reviews ({commentData.length})</p>
          <form action="">
            
          </form>
          <FaRegWindowClose className='text-xl text-red-500 hover:text-red-600 cursor-pointer' onClick={onClose}/>
       </div>
        <div className='h-[70vh] w-[280px] md:w-[800px] overflow-scroll bg-white border border-gray-600 rounded'>
              {
                commentData.map((review,index)=>(
                    <div className='bg-purple-500 border rounded w-full h-auto p-2' key={index}>
                        <p className='text-white font-bold text-lg'>{review?.userName}</p>
                        <p className='text-white'>{review?.rating}</p>
                        <p className='text-white'>{review?.comment}</p>
                    </div>
                ))
            }
        </div>
       </div>
    </div>
  )
}

export default ProductComments
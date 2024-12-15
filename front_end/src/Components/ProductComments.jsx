import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaRegWindowClose } from "react-icons/fa";
import { IoMdSend } from 'react-icons/io';
import toast from 'react-hot-toast';
function ProductComments({ProductId,onClose}) {
    const [commentData,setCommnetData]=useState([])
    const initialCommentData={
      user:"",
      userName:"",
      comment:""
    }
    const [comments,setComments]=useState(initialCommentData)
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

    const handleCommentChange=(e)=>{
       const {name,value}=e.target
       setComments((prev)=>{
         return {
          ...prev,
          [name]:value
         }
       })
       console.log("comment",value)
    }
    const handleCommentSubmit=async()=>{
      try {
        const commentResponse=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/products/create_comment/${ProductId}`,comments,{withCredentials:true})
        //console.log("comment resposnse",commentResponse)
        toast.success("comment send successfully")
        setComments(initialCommentData)
      } catch (error) {
        console.error("error white comment product",error)
        toast.error(error?.message)
      }
    }
  return (
    <div className=' w-full h-[110vh] flex justify-center fixed top-0 left-0 p-20 right-0 bottom-0 bg-slate-200 bg-opacity-80 z-50"'>
      <div>
       <div className=' w-full flex justify-between '>
          <p className='text-lg font-bold'>All Reviews ({commentData.length})</p>
          <FaRegWindowClose className='text-xl text-red-500 hover:text-red-600 cursor-pointer' onClick={onClose}/>
       </div>
        <div className='h-[70vh] w-[280px] md:w-[800px] overflow-scroll overflow-x-hidden bg-white shadow-md rounded'>
          <div className='flex p-4 bg-white fixed md:w-[783px] shadow-lg z-20 justify-center items-center' >
            <input type="text" name='comment' value={comments.comment} onChange={handleCommentChange} placeholder='Write a comment...' autoFocus className='p-[3px] md:w-[400px] outline-none  text-lg border border-blue-600'/>
                <div onClick={handleCommentSubmit} className='p-2 flex justify-center items-center bg-blue-600 text-white text-xl font-bold hover:bg-blue-500'>
                    <IoMdSend/>
                </div>
           </div>
              {
                commentData.map((review,index)=>(
                    <div className='bg-purple-500 w-full h-auto p-2' key={index}>
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
import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import {Toaster,toast} from "react-hot-toast"
function AllUserMessages() {
    const [allMessage,setAllMessage]=useState([])
    const [loading,setLoading]=useState(true)
    const [countMessagess,setCountMessagess]=useState([])
   const getMessage=async()=>{
      try {
       const response= await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/message/get_all_message`,{withCredentials:true})
       console.log("all message",response)
       setAllMessage(response.data.data)
       setLoading(false)
      
      } catch (error) {
        console.error("error while fetching All messagess")
      }
   }
   const countMessage=async()=>{
    try {
        const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/message/count_all_messagess`,{withCredentials:true})
        setCountMessagess(response.data.data)
        console.log("count response",response)
    } catch (error) {
        console.error("error while counting user messagess",error)
    }
   }
   useEffect(()=>{
    getMessage()
   },[])
   useEffect(()=>{
    countMessage()
   },[])

   const handleDeleteMessage=async(_id)=>{
      try {
        const response=await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/message/delete_user_message/${_id}`,{withCredentials:true})
        console.log("delete response",response)
        toast.success(response.data.message)
        setAllMessage((prevMessages) => prevMessages.filter((message) => message._id !== _id));
        setCountMessagess((prevCount) => prevCount - 1);
      } catch (error) {
        console.error("error while deleting user message")
        toast.error("not deleted something is wrong")
      }
   }   
  return (
    <div>
     <h1 className='w-full text-center font-bold p-2 text-xl'>All Messagess <span>{`(${countMessagess})`}</span></h1>
      <div className='bg-white pb-4 w-full flex items-center overflow-x-hidden'>
       <table className='w-full userTable'>
        <thead> 
           <tr className='bg-gray-800 text-white'>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Action</th>
           </tr>
         </thead>
        
           {
            loading ? (
              <div className='w-full mt-4 flex justify-center'>
                <div className="w-fit p-2 bg-gray-600 text-white text-center">loading,wait...</div>
                {
                  allMessage.length===0&& !loading&&(
                    <div className='w-full h-32 flex justify-center items-center shadow-md '>
                      <p className='text-xl font-bold text-gray-600'>No Message Availble</p>
                    </div>
                  )
                }
              </div>
              
            ) :(
              <tbody>
              {
                allMessage.map((ele,index)=>{
               return (
                <tr key={index}>
                  <td className='p-2 px-4'>
                    {index+1}
                  </td>
                  <td className='p-2 px-4'>
                    {ele?.name}
                  </td>
                  <td className='p-2 px-4 font-semibold'>
                    <Link onClick={()=>window.open(`${ele?.email}`,"_blank")}>{ele?.email}</Link>
                    
                  </td>
                  <td className='p-2 px-4 '>
                    {ele?.message}
                  </td>
                  <td className='p-2 px-4 font-semibold'>
                      <button className='bg-red-600 text-white p-2 font-bold rounded hover:bg-red-700' onClick={()=>handleDeleteMessage(ele?._id)}>Delete</button>
                  </td>
                </tr>
              )
            })
            
          }
              </tbody>
            )
           } 
          

       </table>
      </div>
    </div>
    
  )
}

export default AllUserMessages
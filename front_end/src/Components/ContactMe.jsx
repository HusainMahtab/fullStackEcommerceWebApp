import React, { useState } from 'react'
import axios from 'axios'
import {Toaster,toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
function ContactMe() {
  const initialData={
    name:"",
    email:"",
    message:""
  }
  const navigate=useNavigate()
  const [messageData,setMessageData]=useState(initialData)
    
  const handleOnChange=(e)=>{
    const {name,value}=e.target
    setMessageData((prev)=>{
      return {
         ...prev,
         [name]:value
      } 
    })
    //console.log(value) 
  }
  const handleSubmit=async(e)=>{
     e.preventDefault()
     try {
      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/message/user_message`,messageData)
      toast.success(response?.data?.message)
      navigate("/")
      console.log(response)
     } catch (error) {
       console.error("error while send message to developer",error)
       toast.error("message not sent to developer")
     }
  }
  return (
    <div className='w-full flex justify-center items-center p-14 md:p-8 bg-[#00ffff]'>
        <div className='bg-white h-[400px] w-[350px] grid rounded'>
            <h1 className='p-4 text-center font-bold text-xl'>Contact Me</h1>
            <form action="submit" className='w-[300px] grid gap-4 justify-center place-content-center p-4' onSubmit={handleSubmit}>
                <div className='grid gap-2 w-full'>
                  <label htmlFor="name">Name</label>
                  <input type="text" id='name' name='name' value={messageData.name} placeholder='Enter Your Name' required className='p-2 border-b' onChange={handleOnChange}/>
                </div>
                <div className='grid gap-2 w-full'>
                  <label htmlFor="email">Email</label>
                  <input type="email" id='email' name='email' value={messageData.email} placeholder='Enter Your Email' required className='p-2 border-b ' onChange={handleOnChange}/>
                </div>
                <div className='grid gap-2 w-full'>
                  <label htmlFor="message">message</label>
                  <input type="text" id='message' name='message' value={messageData.message} placeholder='Enter Your Name' required className='p-2 border-b' onChange={handleOnChange}/>
                </div>
                <div className='w-full h-12 flex justify-center items-center'>
                  <button className='text-lg font-bold bg-[#009973] p-2 px-4 w-32 text-white rounded'>Submit</button>
                  <Toaster/>
                </div>
            </form>
          
        </div>
    </div>
  )
}

export default ContactMe
import React, { useState } from 'react'
import { FaExclamationCircle } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import axios from 'axios';
import {Toaster,toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
function ForgotPassword() {
  const [showNewPassword,setShowNewPassword]=useState(false)
  const [showConfirmPassword,setConfirmPassword]=useState(false)
  const navigate=useNavigate()
  const [formData,setFormData]=useState({
    email:"",
    newPassword:"",
    confirmPassword:""
  })

  const handleChange=(e)=>{
    const {name,value}=e.target
    setFormData((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }

  const handleSubmit=async(e)=>{
     e.preventDefault()
     try {
        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/forgo_password`,formData)
        console.log("forgotpassword",response)
        toast.success(response.data.message)
        navigate("/")
     } catch (error) {
       console.error("error while forgot password")
       toast.error("password not forgot,somthing is wrong")
     }

  }
  return (
    <div className='grid justify-center place-content-center h-[500px] md:h-full gap-3 p-4 pt-10'>
       <div className='flex items-center gap-1'>
         <div className='w-full flex justify-center items-center gap-1'>
           <FaExclamationCircle className='text-xl text-gray-600'/>
           <p className='text-red-600'>enter that email when you are signing.</p>
         </div>
       </div>
       <div className="w-[400px] shadow-md p-8 bg-slate-200">
          <form action="submit" onSubmit={handleSubmit} className='grid gap-2'>
            <div className='grid'>
              <label htmlFor="email" className='font-semibod '>Email:</label>
              <input type="email" id='email' name='email' value={formData.email} placeholder='enter your email' autoFocus className='p-2 rounded text-lg font-semibold outline-none' onChange={handleChange}/>
            </div>
            <div className='grid'>
              <label htmlFor="newPassword" className='font-semibod '>new password:</label>
              <div className='flex justify-between items-center gap-2'>
                <input type={showNewPassword ? "text" : "password"} id='newPassword' name='newPassword' value={formData.newPassword} placeholder='new password' className='p-2  w-full rounded text-lg font-semibold outline-none' onChange={handleChange}/>
                <div onClick={()=>setShowNewPassword((pre)=>!pre)}>
                   {
                    showNewPassword ? (<IoEye className='text-2xl cursor-pointer'/>) :(<IoEyeOff className='text-2xl cursor-pointer'/>)
                   }
                </div>
              </div>
            </div>
            <div className='grid'>
              <label htmlFor="confirmPassword" className='font-semibod '>confirm password:</label>
               <div className='flex justify-between items-center gap-2'>
                 <input type={showConfirmPassword ? "text" : "password"} id='confirmPassword' name='confirmPassword' value={formData.confirmPassword} placeholder='confirm password' className='p-2 w-full text-lg font-semibold rounded outline-none' onChange={handleChange}/>
                 <div onClick={()=>setConfirmPassword((prev)=>!prev)}>
                    {
                      showConfirmPassword ? (<IoEye className='text-2xl cursor-pointer'/>) : (<IoEyeOff className='text-2xl cursor-pointer'/>)
                    }
                 </div>
               </div>
            </div>
            <button className='p-2 bg-gray-600 text-white font-bold hover:bg-gray-700 rounded'>Change Password</button>
            <Toaster/>
          </form>
       </div>
    </div>
  )
}

export default ForgotPassword
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import userprofile from "../assets/user profile.png"
import { IoEye } from "react-icons/io5"; // open eye icon
import { IoEyeOff } from "react-icons/io5"; // clouse eye icons
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import Context from '../context';
function Login() {
    const [showPassword,setshowPasword]=useState(false)
    const [formData,setformData]=useState({email:"",password:""})
    const navigate=useNavigate()
    const [loader,setLoader]=useState(false)
    const {fetchUserDetails,countAddToCartItem}=useContext(Context)
    //console.log("fetchUserDetails",fetchUserDetails())

    const handleChange=(e)=>{
        const {name,value}=e.target
        setformData((preve)=>{
          return{
            ...preve,
            [name]:value
          }
        })
       
    }
    //sconsole.log("data",formData)

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoader(true)
      countAddToCartItem(0)
    try {
    const login_data = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/login`, formData, {
      withCredentials: true, // Ensure cookies are sent with the request
    });
    //console.log("logindata",login_data)
    toast.success(`${login_data.data.data.user.role} login sucessfully`);
    setLoader(false)
    fetchUserDetails(); // Fetch user details after login
    countAddToCartItem()
    navigate("/"); // Navigate to the home page
   } catch (error) {
    toast.error("Invalid Email or Password !");
    setLoader(false)
    console.log("error while logging in user", error);
  }
};

  return (
    <section id='login'>
        <div className="flex justify-center items-center w-full h-[70vh]">
           <div className=" mx-auto container p-4 flex">
             <div className='bg-slate-100 p-2 w-full max-w-md mx-auto'>
                 <div className='w-20 h-20 rounded-full mx-auto'>
                   <img src={userprofile} alt='profile logo' className='animate-bounce'></img>
                 </div>
                  <form onSubmit={handleSubmit} className='pt-4 mx-2'>
                     <div className='grid'>
                        <label className='text-gray-700'>Email:</label>
                        <div className='bg-white p-2'>
                           <input 
                           type="email" 
                           name='email'
                           value={formData.email} 
                           placeholder='Email' 
                           className='w-full h-full outline-none bg-transparent' 
                           onChange={handleChange}/>
                        </div>
                     </div>
                     <div>
                        <label className='text-gray-700'>Password:</label>
                        <div className='bg-white p-2 flex'>
                            <input 
                            type={showPassword ? "text" : "password"}
                            name='password' 
                            value={formData.password} 
                            placeholder='password' 
                            className='w-full h-full outline-none bg-transparent' 
                            onChange={handleChange}/>
                            <div className='cursor-pointer text-lg' onClick={()=>setshowPasword((pre)=>!pre)}>
                                <span>
                                    {
                                      showPassword ? ( <IoEye/>) : (<IoEyeOff/>)  
                                    }
                                </span>
                            </div>
                        </div>
                        <Link to={"/forgot_password"} className=' text-blue-600 block w-fit ml-auto hover:underline hover:text-blue-800'>Forgot-password ? </Link>
                     </div>
                     <div>
                        {
                           loader ? (
                             <div className="w-full flex justify-center items-center mt-6">
                                <div className="p-3 w-[200px] bg-gray-600 rounded-full flex justify-center items-center">
                                   <div className="p-2 rounded-full border-b-2 border-b-slate-300 animate-spin"></div>
                                </div>
                             </div>
                           ) : (
                             <button className='bg-gray-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-gray-700 '>Login</button>  
                           )
                        } 
                     </div>
                  </form>
                  <p className='py-6 text-gray-700 mx-2'>Dot't have account ? <Link to={"/sign_up"} className='text-blue-600 hover:text-blue-800 hover:underline'>Sign up</Link></p>
             </div>
        </div>
        </div>
       
    </section>
  )
}

export default Login
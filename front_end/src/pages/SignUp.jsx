import React from 'react'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import userprofile from "../assets/user profile.png"
import { IoEye } from "react-icons/io5"; // open eye icon
import { IoEyeOff } from "react-icons/io5"; // clouse eye icons
import { IoIosMail } from "react-icons/io";
import imageTobase64 from '../helpers/imageTobase64';
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"


function SignUp() {
    const [showPassword,setshowPasword]=useState(false)
    const [showComfirmPassword,setShowConfirmPassword]=useState(false)

    const navigate=useNavigate()

    const initialData={
      userName:"",
      email:"",
      password:"",
      confirmPassword:"",
      profilePic:""
    }

     const [formData,setformData]=useState(initialData)
   
    const handleChange=(e)=>{
        const {name,value}=e.target
        setformData((preve)=>{
          return{
            ...preve,
            [name]:value
          }
        })
       
    }
    //console.log("data",formData)

    const handleSubmit=async(e)=>{
      e.preventDefault()
      if(formData.password===formData.confirmPassword){
         //console.log(formData.userName,formData.email,formData.profilePic,formData.password)
         
      try {
         const signup_api=await axios.post(`https://fullstackecommercewebapp.onrender.com/api/v1/users/signup`,formData,{withCredentials:true})
         //console.log(signup_api.data)
         toast.success(`${signup_api.data.message}`)
         setTimeout(()=>{
            navigate("/login")
         },[500])

         setformData(initialData)
       
        
      } catch (error) {
        
        console.log("error whiling signup user",error) 
        toast.error(`user not created ! something is wrong`)
        
      } 
      }else{
         toast.error("please check password and confirm password")
      }

      
      
    }

   const handleUploadPic=async(e)=>{
      const file=e.target.files[0]

      const imagePic=await imageTobase64(file)
      setformData((preve)=>{
        return {
          ...preve,
          profilePic:imagePic
        }
      })
      setformData({profilePic:imagePic})
      console.log("imagePic",imagePic)
   }

  return (
    <section id='signup'>
    <div className=" mx-auto container p-4 h-[80vh] md:h-[90vh] flex justify-center items-center">
         <div className='bg-gray-200 p-2 w-full max-w-md mx-auto rounded-xl'>
             <div className='w-20 h-20 rounded-full mx-auto relative overflow-hidden'>
               <div>
                  <img src={formData.profilePic || userprofile} alt='profile logo'></img>
               </div>
               <form>
                  <label>
                    <div className='text-xs bg-opacity-80 bg-gray-300 py-2 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                     Upload Photo
                     </div>
                     <input type="file" className='hidden' onChange={handleUploadPic}/>
                  </label>
               </form>
             </div>
              <form onSubmit={handleSubmit} className='pt-4 mx-2'>
                 <div className='grid'>
                    <label className='text-gray-700'>UserName:</label>
                    <div className='bg-white p-2'>
                       <input 
                       type="text" 
                       name='userName'
                       value={formData.userName} 
                       placeholder='UserName' 
                       className='w-full h-full outline-none bg-transparent' 
                       required
                       onChange={handleChange}/>
                    </div>
                 </div>
                 <div className='grid my-2'>
                    <label className='text-gray-700'>Email:</label>
                    <div className='bg-white p-2 flex'>
                       <input 
                       type="email" 
                       name='email'
                       value={formData.email} 
                       placeholder='Email' 
                       className='w-full h-full outline-none bg-transparent' 
                       required
                       onChange={handleChange}/>
                       <div>
                          <IoIosMail/>
                       </div>
                    </div>
                    
                 </div>
                 <div className='my-2'>
                    <label className='text-gray-700'>Password:</label>
                    <div className='bg-white p-2 flex'>
                        <input 
                        type={showPassword ? "text" : "password"}
                        name='password' 
                        value={formData.password} 
                        placeholder='password' 
                        className='w-full h-full outline-none bg-transparent' 
                        required
                        onChange={handleChange}
                        />
                        <div className='cursor-pointer text-lg' onClick={()=>setshowPasword((pre)=>!pre)}>
                            <span>
                                {
                                  showPassword ? ( <IoEye/>) : (<IoEyeOff/>)  
                                }
                            </span>
                        </div>
                    </div>
                    {/* <Link to={"/forgot_password"} className=' text-blue-600 block w-fit ml-auto hover:underline hover:text-blue-800'>Forgot-password ? </Link> */}
                 </div>
                 <div>
                    <label className='text-gray-700'>Confirm-Password:</label>
                    <div className='bg-white p-2 flex'>
                        <input 
                        type={showComfirmPassword ? "text" : "password"}
                        name='confirmPassword' 
                        value={formData.confirmPassword} 
                        placeholder='confirm password' 
                        className='w-full h-full outline-none bg-transparent' 
                        onChange={handleChange}
                        required
                        />
                        <div className='cursor-pointer text-lg' onClick={()=>setShowConfirmPassword((pre)=>!pre)}>
                            <span>
                                {
                                    showComfirmPassword ? ( <IoEye/>) : (<IoEyeOff/>)  
                                }
                            </span>
                        </div>
                    </div>
                    {/* <Link to={"/forgot_password"} className=' text-blue-600 block w-fit ml-auto hover:underline hover:text-blue-800'>Forgot-password ? </Link> */}
                 </div>
                 <div>
                     <button className='bg-gray-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-gray-700 '>Register</button>
                     <Toaster toastOptions={{
                       className: 'shadow-lg',
                       style: {
                          border: '1px solid #713200',
                          padding: '10px',
                          color: 'gray',
                          backgroundColor:"white"
                        },
                     }}
                    />
                 </div>
              </form>
              <p className='py-6 text-gray-700 mx-2'>You have already account ? <Link to={"/login"} className='text-blue-600 hover:text-blue-800 hover:underline'>Login</Link></p>
         </div>
    </div>
</section>
  )
}

export default SignUp
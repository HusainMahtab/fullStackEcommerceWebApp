import React, { useEffect, useState, useContext} from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/mylogo.png';
import { GrSearch } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import {useSelector} from "react-redux"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setUserDetails} from "../store/userSlice"
import ROLE from '../common/role';
import Context from '../context';

function Header() {
const user=useSelector(state=>state?.user?.user)
 const [showMenu,setShowMenu]=useState(false)
 const dispatch=useDispatch() 
 const context =useContext(Context)
 const navigate=useNavigate()
 const mobileSearchInput=useLocation()
 const URLSearch=new URLSearchParams(mobileSearchInput?.search)
 const searhQuery=URLSearch.getAll("q")
 const [mobileSearch,setMobileSearch]=useState(searhQuery)
 const [loader,setLoader]=useState(false)
 const handleLogout=async()=>{
      setLoader(true)
      try {
      const logOutApi=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/log_out`,{},{withCredentials:true})   
        dispatch(setUserDetails(null)) 
        setLoader(false)
        toast.success(`${logOutApi?.data?.message}`)
        navigate("/")
      } catch (error) {
        console.log("error while logout the user",error)
        toast.error("user does't logOut")
        setLoader(false)
      }
  }

  const handleSearchProduct=(e)=>{
    const {value}=e.target
    setMobileSearch(value)
    if(value){
      navigate(`/search-products?q=${value}`)
    }else{
      navigate(`/search-products`)
    }
  }
  
  return (
    <header className="bg-white black-white shadow-lg px-2 fixed top-0 left-0 right-0 z-10">
      <div className='container mx-auto flex items-center h-16 justify-between'>
        <div className='h-16 w-16'>
          <Link to={"/"}>
            <img className='object-cover h-full w-full cursor-pointer animate-bounce' src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="hidden md:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2">
          <input className='w-full h-6 outline-none text-gray-500' type='text' placeholder='Search product here....' onChange={handleSearchProduct} value={mobileSearch}/>
          <div className='text-lg min-w-[50px] h-8 bg-gray-500 flex items-center justify-center rounded-r-full text-white cursor-pointer hover:bg-gray-600' >
            <GrSearch />
          </div>
        </div>
        <div className='flex items-center gap-6'>
         <div className="relative flex justify-center">
          {
            user?._id &&(
              <div
            className='relative text-2xl text-gray-500 cursor-pointer justify-center'
            onClick={()=>setShowMenu(pre=>!pre)}
           >
           {
            user?.profilePic ? (
              <div className='flex flex-col justify-center items-center'>
               <img className="rounded-full w-8 h-8" src={user?.profilePic} alt={user?.name}/>
               {
                 user?.role==="ADMIN"&&(
                  <h4 className='text-sm font-semibold text-gray-600'>ADMIN</h4>
                 )
               }
              </div>
             
            ):(<FaUserCircle className='hover:text-gray-600' />)
           }
          </div>
            )
          }
          {
            showMenu &&( 
              <div className="absolute bg-white bottom-0 top-11 h-fit p-4 shadow-lg rounded hidden md:block">
                <nav>
                {
                  user?.role===ROLE.ADMIN &&(
                    <Link to={"/admin_panel/all_product"} className='whitespace-nowrap  hover:bg-slate-100 p-2 rounded '  onClick={()=>setShowMenu(pre=>!pre)}>Admin Panel</Link>
                  )
                }       
                </nav>
             </div>
             )
          }
         
         </div>
            {
              user?._id &&(
                <div className="">
                  <div className='text-2xl text-gray-500 cursor-pointer relative'>
                    <Link to={"/addToCart-products"}><FaShoppingCart className='hover:text-gray-600' /></Link>
                    <div className='bg-red-600 text-white w-4 p-1 h-4 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
                    <p className='text-xs'>{context?.countAddtoCartProduct}</p>
                  </div>
                </div>
                </div>
              )
            }
         
          <div className='flex justify-center items-center gap-2'>
           {
            user?._id ? (<div>
                {
                  loader ? (
                    <div className="flex justify-center items-center">
                       <div className='flex justify-center items-center w-20 p-2 bg-red-600 rounded-full'>
                         <div className='p-2 rounded-full border-b border-b-white animate-spin'></div>
                       </div>
                    </div>
                  ) : (<button onClick={handleLogout} className='px-3 bg-red-700 py-1 rounded-full text-white text-xs hover:bg-red-600'>LogOut</button>)
                }
            </div>)
            :(<Link to={"/login"} className='p-2 text-white font-bold bg-gray-600 rounded hover:bg-gray-500'> Login</Link>)
               
           }
            <div>
               {
                !user?._id&&(
                  <Link to={"/sign_up"} className='border font-bold text-lg border-gray-600 text-gray-600 hover:text-white hover:bg-gray-600 p-2 rounded'>SignUp</Link>
                )
               }
            </div>
             <Toaster/>         
                
          </div>
          
        </div>
      </div>
    </header>
  );
}

export default Header;

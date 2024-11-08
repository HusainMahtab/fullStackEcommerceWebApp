import React from 'react'
import CategoryList from '../Components/CategoryList'
import BannerProduct from "../Components/BannerProduct"
import ShowCategoryWiseProduct from '../Components/ShowCategoryWiseProduct'
import VerticalProductCart from '../Components/VerticalProductCart'
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom'
function Home() {
  const navigate=useNavigate()
  return (
    <div className=''>
      <div className='flex justify-center items-center w-full h-[85px] bg-white fixed z-20 p-2 md:hidden'>
         <div className='flex'>
            <button onClick={()=>navigate("/search")} className='w-[200px] p-2 rounded-l text-lg font-semibold border border-gray-600 text-gray-600 hover:text-white hover:bg-gray-600 '>Search Product</button>
           <div className='w-[50px] rounded-r-xl flex justify-center items-center text-white bg-gray-600'>
              <CiSearch className='text-2xl font-bold text-white'/>
           </div>
         </div> 
      </div>
      <CategoryList/>
      <BannerProduct/>
      <ShowCategoryWiseProduct category={"airpodes"} heading={"Top's Airpodes"}/>
      <ShowCategoryWiseProduct category={"watches"} heading={"Popular's Watches"}/>
      <ShowCategoryWiseProduct category={"speakers"} heading={"Best's Speakers"}/>
      <ShowCategoryWiseProduct category={"earphone"} heading={"Best's Earphones"}/>
      <VerticalProductCart category={"mobiles"} heading={"Latest's Mobiles"}/>
      <VerticalProductCart category={"mouse"} heading={"Latest's Mouse"}/>
      <VerticalProductCart category={"televisions"} heading={"Popular's Televisions"}/>
      <VerticalProductCart category={"camera"} heading={"Camera & Photography"}/>
      <VerticalProductCart category={"printers"} heading={"Latest's Printers"}/>
      <VerticalProductCart category={"refrigerator"} heading={"Latest's refrigerator"}/>
      <VerticalProductCart category={"trimmers"} heading={"Latest's Trimmers"}/>
      <VerticalProductCart category={"shirt"} heading={"Style & Fashion's"}/>
      <VerticalProductCart category={"t-shirt"} heading={"Style & Fashion's"}/>
      
    </div>
  )
}

export default Home
import React from 'react'
import { Link } from 'react-router-dom'
import displayINRCurrency from '../helpers/displayCurrencyThemes'
import { useSelector } from 'react-redux'
import Context from '../context'
import { useContext } from 'react'
import addToCart from "../helpers/addToCart"
function VerticalCart({loading,data=[]}) { 
    const loadingList=new Array(14).fill(null)
    const user=useSelector(state=>state?.user?.user)
    const {countAddToCartItem}=useContext(Context)

    const handleAddToCart=async(e,_id,user)=>{
        await addToCart(e,_id,user)
        await countAddToCartItem()
      }
  return (
    <div className='container px-2 md:mx-8 mx-auto'>
    {
      loading ? (
        <div className="flex items-center gap-2 md:gap-6 overflow-scroll overflow-y-hidden scrollbar-hide scroll-smooth transition-all">
          {
            loadingList.map((ele,index)=>(
              <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] shadow-lg rounded-lg mb-4 md:mb-6" key={index+1}>
                <div className="h-56 md:p-6 p-4 rounded-lg min-w-[280px] md:min-w-[145px] flex justify-center items-center bg-gray-400 animate-pulse">
                     
                </div>
                <div className="px-4">
                   <div className='w-full flex justify-between items-center pt-6'>
                     <div className="bg-gray-400 rounded-full w-20 h-4 animate-pulse">
                       <h2 className='text-lg md:font-medium font-base text-ellipsis line-clamp-1 w-full bg-gray-400 animate-pulse'></h2>
                     </div>
                      <div className='w-12 h-12 mx-4 rounded-full bg-gray-400 text-white flex justify-center items-center text-sm animate-pulse'>
                        
                      </div> 
                   </div>  
                   <div className="bg-gray-400 w-20 h-4 rounded-full animate-pulse">
          
                   </div>                    
                   <div className='flex gap-3 my-2'>
                      <p className='font-medium bg-gray-400 w-20 h-4 rounded-full animate-pulse'></p>   
                      <p className='bg-gray-400 w-20 h-4 rounded-full animate-pulse'></p>
                   </div>
                  <button className=' w-20 px-4 py-2 my-2 bg-gray-400 rounded-full animate-pulse'></button>
                  <button className=' w-20 px-4 py-2 my-2 mx-2 bg-gray-400 rounded-full animate-pulse'></button>
                  
                </div>
              </div>
            ))
          }
        
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center gap-1 md:justify-between overflow-scroll overflow-y-hidden scrollbar-hide scroll-smooth transition-all">
          {
            data.map((ele,index)=>(
              <Link to={"/product/"+ele?._id} className="w-full min-w-[280px] md:min-w-[280px] max-w-[300px] md:max-w-[320px] bg-white shadow-lg rounded-lg mb-4 md:mb-6" key={index+1} onClick={()=>scrollTop()}>
                <div className="bg-slate-100 h-56 md:p-6 p-4 rounded-lg min-w-[260px] md:min-w-[145px] flex justify-center items-center">
                     <img className="object-scale-down w-full h-full cursor-pointer hover:scale-125 transition-all duration-500 mix-blend-multiply" src={ele.productImage[0]}/>
                </div>
                <div className="px-4">
                   <div className='w-full flex justify-between items-center pt-6'>
                      <h2 className='text-lg md:font-medium font-base text-ellipsis line-clamp-1 text-black'>{ele?.productName}</h2>
                      <div className='w-12 h-12 mx-4 rounded-full bg-yellow-800 text-white flex justify-center items-center text-sm'>
                        <p className='font-bold grid place-items-center'>{((ele?.price - ele?.sellingPrice) / ele?.price * 100).toFixed(1)}%<p>OOF</p></p>
                      </div> 
                   </div>                      
                   <p className="capitalize text-slate-500">{ele?.category}</p>
                   <div className='flex gap-3'>
                      <p className='font-medium text-blue-600'>{displayINRCurrency(ele.sellingPrice)}</p>
                      <p className='text-slate-500 line-through'>{displayINRCurrency(ele?.price)}</p>
                   </div>
                  
                  <div className="flex gap-4 py-4">
                     <button className='px-3 py-1 border-2 border-yellow-800 text-yellow-800 hover:bg-yellow-800 hover:text-white rounded-lg font-bold text-lg' onClick={(e)=>handleAddToCart(e,ele?._id,user)}>Add to Cart</button>
                     <button className='px-3 py-1 border-2 border-yellow-800 bg-yellow-800 text-white hover:bg-yellow-700 rounded-lg font-bold text-lg'>Buy Now</button> 
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

export default VerticalCart
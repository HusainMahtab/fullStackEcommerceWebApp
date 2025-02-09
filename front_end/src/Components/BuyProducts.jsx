import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import axios from "axios"
import toast from 'react-hot-toast';
import displayINRCurrency from '../helpers/displayCurrencyThemes';
import { useNavigate } from 'react-router-dom';
function BuyProducts() {
  const [ProductData,setProductData]=useState({
   _id:"",
    productName:"",
    brandName:"",
    category:"",
    description:"",
    price:"",
    productImage:[],
    sellingPrice:"",
    stock:"",
    ratings:"",
    numOfReviews:"",
    reviews:[]
  })

  const [orderData,setOrderData]=useState({
    product:[{
      productId:"",
      productName:"",
      productImage:"",
    }],
    customerName:"",
    customerAddress:"",
    phoneNumber:"",
    quantity:1,
    paymentMethods:""
  })
  const [updateQuantity,setUpdateQuantity]=useState(1)
  const [loading,setLoading]=useState(true)
  const params=useParams()
  const navigate=useNavigate()
  const fetchedProductDetails=async()=>{
    try {
       const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/products/productDetails`,params,{withCredentials:true})
        console.log("productDetails",response)
        setProductData(response?.data?.data?.product)
       //console.log("Data",data)
       setLoading(false)
    } catch (error) {
        console.error("error while post product details")
    }
  }
  useEffect(()=>{
    fetchedProductDetails()
  },[params])
  
  //console.log("Image",formData?.productImage[0])
  
  const handleChange=(e)=>{
     const {name,value}=e.target
     setOrderData((prev)=>{
       return{
        ...prev,
        [name]:value
       } 
     })
     //console.log(value)
  }

  const handleSubmit=async(e)=>{
     e.preventDefault()
     const updatedOrderData={
      ...orderData,
      quantity:updateQuantity,
      paymentMethods:"Online payment completed"
     }
     //console.log("orderData",updatedOrderData)
     try {
      const orderResponse=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/orders/order`,updatedOrderData,{withCredentials:true})
      toast.success("Payment sucessfull")
      //console.log("orderResponse",orderResponse)
      navigate("/confirm_order")
    } catch (error) {
      console.error("error while creating a order",error)
      toast.error("Payment Error")
    }
  }

  useEffect(() => {
    // Update orderData when ProductData is set
    if (ProductData._id) {
      setOrderData((prevOrderData) => ({
        ...prevOrderData,
        product: [{
          productId: ProductData._id,
          productName: ProductData.productName,
          productImage: ProductData.productImage[0],
        }]
      }));
    }
  }, [ProductData]);

  const handleCaseOnDeleverySubmit=async(e)=>{
     e.preventDefault()
     const updatedOrderData={
      ...orderData,
      quantity:updateQuantity,
      paymentMethods:"Case on delevery"
     }
     //console.log("orderData",updatedOrderData)
     try {
      const orderResponse=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/orders/order`,updatedOrderData,{withCredentials:true})
      toast.success("Order sucessful")
      //console.log("orderResponse",orderResponse)
      navigate("/success_order")
    } catch (error) {
      console.error("error while creating a order",error)
      toast.error("Plese Enter inputs fields!")
    }

  }

  const handleIncressQuantity=()=>{
    setUpdateQuantity((prev)=>prev+1)
    
  }
  const handleDecressQuantity=()=>{
    setUpdateQuantity((prev)=>prev>1 ? prev-1 : 1)
  }

  return (
     <div>
       {
        loading ? ( 
        <div className='w-[0px] md:w-full grid justify-center place-content-center p-2 gap-4'>
         <div className='flex gap-2 p-4 '>
           <div className='p-2 bg-slate-200 flex justify-center items-center animate-pulse'>
             <img src={""} className='w-[350px] h-[150px] md:w-[200px] md:h-[200px] mix-blend-multiply' />
           </div>
           <div className='grid gap-2'>
              <p className='text-center bg-slate-300 rounded-full animate-pulse'></p>
              <h1 className='text-lg font-bold bg-slate-300 animate-pulse'></h1>
              <p className='p-1 bg-slate-300 animate-pulse'></p>
              <div className='flex text-xl gap-2 font-bold'>
                <IoIosStar className='text-slate-300 animate-pulse'/>
                <IoIosStar className='text-slate-300 animate-pulse'/>
                <IoIosStar className='text-slate-300 animate-pulse'/>
                <IoIosStar className='text-slate-300 animate-pulse'/>
                <IoIosStarHalf className='text-slate-300 animate-pulse'/>
              </div>
              <p className='bg-slate-300 animate-pulse p-1'></p>
              <p className=' bg-slate-300 animate-pulse p-1'></p>
              <div className='flex gap-2'>
                <p className='bg-slate-300 p-1 animate-pulse'></p>
                <p className='bg-slate-300 p-1 animate-pulse'></p>
              </div>
              <p className='p-1 bg-slate-300 animate-pulse'></p>
           </div>
         </div>
         <form action="submit" className='grid gap-2 mb-4'>
            <div className='grid ga-2'>
               <label className='p-1 bg-slate-300 animate-pulse'></label>
               <input className='p-2 bg-slate-300 animate-pulse'/>
            </div>
            <div className='grid'>
               <label className='p-1 bg-slate-300 animate-pulse'></label>
               <textarea className='p-1 bg-slate-300 animate-pulse'></textarea>
            </div>
            <div className='grid'>
               <label className='p-1 bg-slate-300 animate-pulse'></label>
               <input className='p-1 bg-slate-300 animate-pulse'/>
            </div>
            <div className='flex gap-2 justify-center items-center'>
               <label className='p-1 bg-slate-300 animate-pulse'></label>
               <div className='p-1 bg-slate-300 animate-pulse'></div>
                <p className='p-1 bg-slate-300 animate-pulse'></p>
               <div className='p-1 bg-slate-300 animate-pulse'></div>
            </div>
            <div className='grid'>
               <label className='p-1 bg-slate-300 animate-pulse'></label>
               <p className='p-1 bg-slate-300 animate-pulse'></p>
            </div>
            <button className='p-1 bg-slate-300 animate-pulse'></button>
            <button className='p-1 bg-slate-300 animate-pulse'></button>

         </form>
        </div>
        ) : (
        <div className='w-full grid justify-center place-content-center p-3 gap-4'>
         <div className='flex gap-6 p-4 bg-[#8876]'>
           <div className='p-2 bg-slate-200 flex justify-center rounded items-center'>
             <img src={ProductData?.productImage[0]} alt={ProductData?.productName} className='w-[350px] h-[150px] md:w-[200px] md:h-[200px] mix-blend-multiply' />
           </div>
           <div className='grid'>
              <p className='w-full text-center bg-slate-300 rounded-full'>{ProductData?.brandName}</p>
              <h1 className='text-lg font-bold'>{ProductData?.productName}</h1>
              <p>{ProductData?.category}</p>
              <div className='flex text-xl font-bold text-gray-700'>
                <IoIosStar/>
                <IoIosStar/>
                <IoIosStar/>
                <IoIosStar/>
                <IoIosStarHalf/>
              </div>
              <p>Total-Review:{ProductData?.numOfReviews}</p>
              <div className='flex gap-2'>
                <p className='text-lg'>{displayINRCurrency(ProductData?.sellingPrice)}</p>
                <p className='text-slate-500 line-through'>{displayINRCurrency(ProductData?.price)}</p>
              </div>
              <p className='text-sm text-green-600 animate-ping font-bold w-full text-center'>OFF- {displayINRCurrency(ProductData?.price-ProductData?.sellingPrice)}</p>
           </div>
         </div>
         <div className="">
         <form action="submit" className='grid gap-2 mb-4' onSubmit={handleSubmit}>
            <div className='grid'>
               <label htmlFor="customer">CustomerName:</label>
               <input type="text" id="customer" autoFocus name='customerName' value={orderData.customerName} placeholder='Enter your name' onChange={handleChange} className='p-2 text-lg font-semibold bg-slate-200' required />
            </div>
            <div className='grid'>
               <label htmlFor="address">Address:</label>
               <textarea name="customerAddress" id="address" value={orderData.customerAddress} onChange={handleChange} placeholder='Enter your address' className='p-2 text-lg font-semibold bg-slate-200' required></textarea>
            </div>
            <div className='grid'>
               <label htmlFor="phoneNumber">PhoneNumber:</label>
               <input type="number" id="phoneNumber" name='phoneNumber' value={orderData.phoneNumber} placeholder='Enter your phone' onChange={handleChange} className='p-2 text-lg font-semibold bg-slate-200'required />
            </div>
            <div className=' w-full flex gap-2 justify-center items-center'>
               <label htmlFor="">Quantity:</label>
               <div onClick={handleIncressQuantity} className='p-1 bg-gray-600 cursor-pointer text-white font-bold hover:bg-gray-700 px-4'>+</div>
                <p>{updateQuantity}</p>
               <div onClick={handleDecressQuantity} className='p-1 bg-gray-600 text-white cursor-pointer font-bold hover:bg-gray-700 px-5'>-</div>
            </div>
            <div className='grid'>
               <label htmlFor="price">Total Amount:</label>
               <p className='text-xl font-mono font-bold'>{displayINRCurrency((ProductData?.sellingPrice)*updateQuantity)}</p>
            </div>
            <button className='w-full p-2 text-lg bg-purple-700 text-white font-bold rounded hover:bg-purple-600'>{displayINRCurrency((ProductData?.sellingPrice)*updateQuantity)} Pay</button>
         </form>
         <button className='w-full p-2 text-lg border-2 border-purple-700 text-purple-700 font-bold rounded hover:bg-purple-600 hover:text-white' onClick={handleCaseOnDeleverySubmit}>Case on Delevery</button>
         </div>
        </div>
        )
       }
     </div>
  )
}

export default BuyProducts
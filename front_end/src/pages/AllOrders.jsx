import React, { useEffect, useState } from 'react'
import { FcOk } from "react-icons/fc";
import axios from 'axios'
function AllOrders() {
    const [data,setData]=useState([]) 
    const [loading,setLoading]=useState(true)
    const fetchOrders=async()=>{
        try {
            const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/orders/all_orders`,{withCredentials:true})
            console.log("order response",response)
            setData(response?.data?.data)
            setLoading(false)
        } catch (error) {
            console.error("error while fething all orders",error)
        }
    }
    useEffect(()=>{
        fetchOrders()
    },[])
  return (
    <div>
        <div>
            <h1 className='w-full text-center p-2 font-bold text-lg '>All Orders</h1>
            {
                data.length===0 &&!loading&&(
                    <div className='w-full h-32 flex justify-center items-center shadow-md '>
                      <p className='text-xl font-bold text-gray-600'>No Data is Availble</p>
                    </div>
                )
            }
            <div>
               {
                 loading ? (
                    <div className="w-full h-32 flex justify-center items-center">
                       <p className='text-md p-2 font-bold text-white bg-gray-600'>Loading,wait...</p>
                    </div>
                 ) : (
                    <div className='grid gap-3 p-4'>
                        {
                            data.map((ele,index)=>(
                                <div className='flex gap-2 border bg-gray-600 border-gray-600 rounded' key={index}>
                                    <div className='p-4 bg-slate-300 rounded'>
                                        <img src={ele?.product[0]?.productImage[0]} alt="" className='w-[200px] h-[200px] mix-blend-multiply'/>
                                    </div>
                                    <div>
                                        <p className='text-lg font-semibold text-purple-200'>{ele?.product[0].productName}</p>
                                        <p className='text-lg font-bold text-white'>Customer Name - <span className='text-white font-serif'>{ele?.customerName}</span></p>
                                        <p className='text-lg font-bold text-white'>Customer Address - <span className='text-white font-serif'>{ele?.customerAddress}</span></p>
                                        <p className='text-lg font-bold text-white'>Customer Phone - <span className='text-white'>{ele?.phoneNumber}</span></p>
                                        <p className='text-lg font-bold text-white'>Quantity - {ele?.quantity}</p>
                                        <div className='flex justify-center items-center gap-2'>
                                          <p className='text-lg font-bold text-white'>Payment Methods - <span className='text-white font-serif'>{ele?.paymentMethods}</span></p>
                                          <FcOk className='text-xl'/>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                 )
               }
            </div>
        </div>
    </div>
  )
}

export default AllOrders
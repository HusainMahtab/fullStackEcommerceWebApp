import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import VerticalCart from '../Components/VerticalCart'
function SearchProduct() {
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(true)
    const query=useLocation()
    console.log("query",query.search)

    const searchProduct=async()=>{
        try {
            const response=await axios.get(`https://fullstackecommercewebapp.onrender.com/api/v1/products/search-products`+query.search)
            setData(response.data.data.product)
           console.log(response)
           setLoading(false)
        } catch (error) {
            console.error("error while searching products")
        }
    }
    useEffect(()=>{
        searchProduct()
    },[query])
  return (
    <div className='container max-auto p-2'>
        {
            loading && (
                <p className="text-lg text-center">Loading...</p>
            ) 
        }
        <p className='text-lg font-semibold text-gray-600 text-center pb-2'>Search Result:{data.length}</p>
        {
          !loading && data.length === 0 && (
             <p className='bg-white text-lg text-center p-4'>No Data found...</p>
           )
        }
        {
          !loading && data.length !== 0 && (
            <VerticalCart loading={loading} data={data}/>
          )
        }

    </div>
  )
}

export default SearchProduct
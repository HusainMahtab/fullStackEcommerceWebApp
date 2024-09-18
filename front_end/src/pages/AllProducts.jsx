import React, { useEffect, useState } from 'react'
import UploadProducts from '../Components/UploadProducts'
import axios from 'axios'
import AdminProductCart from '../Components/AdminProductCart'
import Loader from '../Components/Loader'

function AllProducts() {
  const [openUploadProduct,setOnenUploadProduct]=useState(false)
  const [allProducts,setAllProducts]=useState([])
  const [loading,setLoading]=useState(true)

  const getAllProducts=async()=>{
    const response= await axios.get(`http://localhost:3000/api/v1/products/allProducts`)
    setAllProducts(response.data.data)
    setLoading(false)
    console.log("all product response",response)
  }

  useEffect(()=>{
     getAllProducts()
  },[])

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className='font-bold text-lg'> All Products </h2>
        <button className='border-2 border-gray-700 text-gray-700 py-0.5 px-2 rounded-full hover:bg-gray-700 hover:text-white transition-all' onClick={()=>setOnenUploadProduct(true)}>Upload Product</button>
      </div> 
        <div>
         {
          loading ? (<Loader/>) : (
            <div className='flex justify-center gap-3 py-2 flex-wrap'>
              {
               allProducts.map((product,index)=>(
                <AdminProductCart 
                key={index+1} 
                productData={product}
                fetchAllProduct={getAllProducts}
               />
               ))
              }
            </div>
          )
         }
         </div> 
      {/* upload product component */}
      {
        openUploadProduct &&(
          <UploadProducts onClose={()=>setOnenUploadProduct(false)} fetchAllData={getAllProducts}/>
        )
      }
       
    </div>
  )
}

export default AllProducts
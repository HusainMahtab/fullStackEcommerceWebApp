import React, { useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import productCategory from "../helpers/productCategory.js"
import { BiCloudUpload } from "react-icons/bi";
import uploadImage from '../helpers/uploadImage.js';
import DisplayImage from './DisplayImage.jsx';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function UploadProducts({onClose,fetchAllData}) {

  const [productData,setProductData]=useState({
    productName:"",
    brandName:"",
    category:"",
    productImage:[],
    description:"",
    price:"",
    sellingPrice:"",
    stock:""
  })

 const [openFullScreenImage,setOpenFullScreenImage]=useState(false)
 const [fullScreenImage,setFullScreenImage]=useState("")
 

  const handleOnChnage=async(e)=>{
     const {name,value}=e.target
     setProductData((prev)=>{
        return{
          ...prev,
          [name]:value
        }
     })
     
  }

  
  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected");
      return; // Exit if no file is selected
    }
    
    try {
      const uploadImageOnCloudinary = await uploadImage(file);
      //console.log("upload image", uploadImageOnCloudinary.data.url);
  
      setProductData((prev) => ({
        ...prev,
        productImage: [...prev.productImage, uploadImageOnCloudinary.data.url],
      }));
    } catch (error) {
      console.error("Failed to upload image:", error);
      // Optionally, show a user-friendly message or handle the error
    }
  };


  const hanldeDeleteProductImage=(index)=>{
    //console.log("image index",index)
    const newProductImage=[...productData.productImage]
    newProductImage.splice(index,1)
     setProductData((prev) => ({
        ...prev,
        productImage: [...newProductImage],
      }));  
}

// upload product on data base
 const handleSubmitProduct=async(e)=>{
  e.preventDefault()
  try {
    const respose= await axios.post(`/api/v1/products/createProduct`,productData,{withCredentials:true})
     console.log("creating product response",respose)
    toast.success("Product created Successfully")
    
    setTimeout(()=>{
       onClose()
    },1000)
    fetchAllData()
  } catch (error) {
     console.log("error while creating product",error)
     toast.error("Product not Created!")
  }
 }

  

  return (
    <div className={"fixed w-full top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-slate-200 bg-opacity-80 z-50"}>
       <div className={"bg-white p-2 rounded w-full max-w-xl h-full max-h-[65%] overflow-hidden "}>
         <div className='flex justify-between items-center'>
            <BiCloudUpload className='text-gray-700 text-2xl'/>
            <h2 className='font-bold text-lg'>Upload Product</h2> 
            <div className="w-fit ml-auto">
              <IoIosCloseCircle onClick={onClose} className='text-xl text-red-700 hover:text-red-600 cursor-pointer'/>
            </div>
         </div>
         <form className='grid p-4 gap-1 overflow-y-scroll h-full pb-8'>
           <label htmlFor="productName">Product Name:</label>
           <input 
           type="text" 
           id='productName' 
           placeholder='enter product name' 
           value={productData.productName}
           name='productName' 
           onChange={handleOnChnage}
           className='p-1 bg-slate-100 border rounded' 
           />
           <label htmlFor="brandName">Brand Name:</label>
           <input 
           type="text" 
           id='brandName' 
           placeholder='enter brand name' 
           value={productData.brandName} 
           name='brandName'
           onChange={handleOnChnage}
           className='p-1 bg-slate-100 border rounded' 
           />
           <label htmlFor="category">Category:</label>
           <select value={productData.category} onChange={handleOnChnage} name='category' className='p-1 bg-slate-100 border rounded'>
            <option value="">Select Category</option>
              {
                productCategory.map((ele,index)=>{
                  return(
                     <option value={ele.value} key={ele.value+index}>{ele.label}</option>
                  )
                })
              }
           </select>
           <label htmlFor="productImage">Product Image:</label>
           <label htmlFor="uploadImageInput">
              <div className='p-2 bg-slate-100 border rounded h-24 w-full flex justify-center items-center cursor-pointer'>
                <div className='text-slate-500 flex justify-center items-center flex-col'>
                  <span className='text-5xl'>
                    <BiCloudUpload/>
                  </span>
                  <p className='text-sm'>Upload Product Image</p>
                  <input type="file" id='uploadImageInput' className='hidden' onChange={handleUploadProduct}/>
                </div>
              </div> 
            </label>
           <div className='flex flex-row gap-2'>
             {
              productData?.productImage[0] ? (
                 productData.productImage.map((ele,index)=>(
                  <div className='relative group'>
                     <img 
                        src={ele} 
                        alt={ele} 
                        width={80} 
                        key={index+1} 
                        height={80} 
                        className='bg-slate-100 border cursor-pointer'
                        onClick={()=>{
                          setOpenFullScreenImage(true)
                          setFullScreenImage(ele)
                          }}
                       />
                       <div className=' absolute bottom-0 right-0  rounded-full p-1 text-white bg-red-600 hidden group-hover:block cursor-pointer' onClick={()=>hanldeDeleteProductImage(index)}>
                         <MdDelete/>
                       </div>
                  </div>
                 ))
              ) : (
                <p className='text-red-600 text-xs'>*please Upload Product here</p>
              )
             }
           
           </div>
           <label htmlFor="price">Price:</label>
           <input 
           type="number" 
           id='price' 
           placeholder='Enter price' 
           value={productData.price} 
           name='price'
           onChange={handleOnChnage}
           className='p-1 bg-slate-100 border rounded' 
           />
           <label htmlFor="sellingPrice">SellingPrice:</label>
           <input 
           type="number" 
           id='sellingPrice' 
           placeholder='Enter sellingPrice' 
           value={productData.sellingPrice} 
           name='sellingPrice'
           onChange={handleOnChnage}
           className='p-1 bg-slate-100 border rounded' 
           />
           <label htmlFor="sellingPrice">Stock:</label>
           <input 
           type="number" 
           id='stock' 
           placeholder='Enter product stock' 
           value={productData.stock} 
           name='stock'
           onChange={handleOnChnage}
           className='p-1 bg-slate-100 border rounded' 
           />
           <label htmlFor="description">Description:</label>
           <textarea className='h-20 border resize-none bg-slate-100 p-2' value={productData.description} name='description' onChange={handleOnChnage} placeholder='enter product descriptions' rows={3}> </textarea>
           <button className='px-2 py-1 bg-gray-700 text-white mt-2 rounded-lg hover:bg-gray-600' onClick={handleSubmitProduct}>Upload Product</button>
           <Toaster/>
         </form>

       </div>
        {/* display image full screen */}
        {
        openFullScreenImage &&(
            <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
        )
       }

    </div>
  )
}

export default UploadProducts
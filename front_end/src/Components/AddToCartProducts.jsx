import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import displayINRCurrency from '../helpers/displayCurrencyThemes';
import { MdClear } from "react-icons/md";
import Context from "../context"
import ConfirmModal from './ConfirmModal';
import toast from "react-hot-toast"

function AddToCartProducts() {
  const [addedProducts,setAddedProducts]=useState([])
  const [loading,setLoading]=useState(true)
  const context=useContext(Context)
  const loadingCart=new Array(context.countAddtoCartProduct).fill(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);
  const {countAddToCartItem}=useContext(Context)
  const addToCart=async()=>{
    try {
        const response=await axios.get(`https://fullstackecommercewebapp-back-end.onrender.com/api/v1/users/view_addtocart_products`,{withCredentials:true})
        //console.log("add to cart response",response.data.data)
        setAddedProducts(response.data.data)
        setLoading(false)
    } catch (error) {
        console.error("error while fetched addToCart products",error)
    }
  }
  useEffect(()=>{
     addToCart()
  },[])
  console.log("addProducts",addedProducts)


  // handle incress quantity
  const handleIncressQuantity = async (_id, qty) => {
  const updatedProducts = addedProducts.map((product) =>
    product._id === _id ? { ...product, quantity: qty + 1 } : product
  );
  setAddedProducts(updatedProducts);
  try {
    const response = await axios.post(
      `https://fullstackecommercewebapp-back-end.onrender.com/api/v1/users/update_addtocart_product`,
      { quantity: qty + 1, _id },
      { withCredentials: true }
    );
    //console.log(response);
    if (response.data.success === true) {
      addToCart();
    }
  } catch (error) {
    console.error("Error while increasing product quantity", error);
  }
};

// handle decress quantity
const handleDecressQuantity = async (_id, qty) => {
  if(qty>1){
    const updatedProducts = addedProducts.map((product) =>
      product._id === _id ? { ...product, quantity: qty - 1 } : product
    );
    setAddedProducts(updatedProducts);
    
    try {
      const response = await axios.post(
        `https://fullstackecommercewebapp-back-end.onrender.com/api/v1/users/update_addtocart_product`,
        { quantity: qty - 1, _id },
        { withCredentials: true }
      );
      //console.log("decress quantity response",response);
      if (response.data.success === true) {
        addToCart();
      }
    } catch (error) {
      console.error("Error while increasing product quantity", error);
    }
  }
};

// handle remove product
const handleRemoveProduct=async(_id)=>{
   try {
      const response=await axios.post(`https://fullstackecommercewebapp-back-end.onrender.com/api/v1/users/delete_addtocart_product`,{_id},{withCredentials:true})
      console.log("delete response",response)
      addToCart()
      setIsModalOpen(false)  
      toast.success("Removed successfully")
      await countAddToCartItem()
   } catch (error) {
     console.error("error while removing addtocart product",error)
     toast.error("product not removed,something is wrong!")

   }
}

// Open the modal and set the product to remove
const handleOpenModal = (_id) => {
  setProductToRemove(_id);
  setIsModalOpen(true);
  
};

// total quantity
const totalQuntity=addedProducts.reduce((pre,current)=>pre+current?.quantity,0)

// total price
const totalPrice=addedProducts.reduce((pre,current)=>(pre+current?.quantity*current?.productId?.sellingPrice),0)


  return (
    <div className='container mx-auto mb-2'>
        <div className='text-center text-lg my-3'>
           {
            addedProducts.length===0 && loading &&(
             <p className='bg-white shadow-lg py-5'>No Cart Items</p>
           )
           } 
        </div>
      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between '>
        <div className='w-full max-w-3xl px-2'>
          {
            loading ? (
                    loadingCart.map((ele,index)=>(
                      <div className='w-full bg-gray-400 h-32 my-2 border border-slate-300 rounded animate-pulse' key={index+1}>
                         
                      </div>
                    ))  
            ):(
                addedProducts.map((product,index)=>(
                 <div>
                  <div className='w-full flex justify-end items-center pt-2'>
                     <MdClear className='text-2xl font-bold hover:text-red-600 cursor-pointer'  onClick={() => handleOpenModal(product._id)}/>
                  </div>
                 <div className='w-full bg-white h-36 border border-gray-600 rounded flex' key={index+1}>
                      <div className='w-28 h-full flex items-center justify-center bg-slate-200 rounded p-2'>
                        <img src={product?.productId?.productImage[0]} alt="product image" className='w-full h-full object-scale-down mix-blend-multiply'/>
                      </div>
                      <div className='p-2 w-full'>
                        <h2 className='text-xl font-semibold lg:text-2xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                        <p className='text-slate-400 capitalize'>{product?.productId?.category}</p>
                        <div className='flex items-center justify-between'>
                          <div className='flex gap-2'>
                            <p className='text-lg text-gray-700 font-semibold'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                            <p className='text-slate-500 line-through'>{displayINRCurrency(product?.productId?.price)}</p>
                          </div>
                          <div className=''>
                             <p className='text-lg text-gray-600 font-semibold'>{displayINRCurrency(product?.productId?.sellingPrice*product?.quantity)}</p>
                          </div> 
                        </div>
                        <div className='flex gap-2 items-center mt-2'>
                          <button className='border border-gray-600 text-gray-600 p-1 w-12 h-8 hover:bg-gray-600 hover:text-white text-xl font-bold rounded-lg flex justify-center items-center' onClick={()=>handleIncressQuantity(product?._id,product?.quantity)}>+</button>
                          <span className='text-xl front-bold'>{product?.quantity}</span>
                          <button className='border border-gray-600 text-gray-600 p-1 w-12 h-8 hover:bg-gray-600 hover:text-white text-xl font-bold rounded-lg flex justify-center items-center' onClick={()=>handleDecressQuantity(product?._id,product?.quantity)}>-</button>
                        </div>
                      </div>                      
                  </div>
                 </div>
                ))
              )
           }
         </div>

        {/*product summary */}
        <div className="flex justify-center md:w-[60%]">
          <div className='mt-5 lg:mt-0 w-full max-w-sm'>
           {  
              loading ? (
               <div className='h-36 bg-gray-400 border border-slate-300 animate-pulse'>
                
               </div>
              ): (
                <div className='h-36 bg-white rounded-lg shadow-lg mt-4'>
                  <h2 className="text-white bg-gray-600 px-4 py-1">Summary</h2>
                  <div className='flex items-center justify-between px-4 gap-2 font-bold text-lg text-green-700'>
                    <p className='text-gray-600'>Quantity:</p>
                    {totalQuntity}
                  </div>
                  <div className='flex items-center justify-between px-4 gap-2 font-bold text-lg text-green-700'>
                    <p className='text-gray-600'>TotalPrice:</p>
                    {displayINRCurrency(totalPrice)}
                  </div>
                  <div className='w-full flex justify-center mt-1'>
                    <button className='font-semibold p-2 w-[90%] hover:bg-blue-700 bg-blue-600 rounded-lg text-white text-lg'>Payment</button>
                  </div>
                </div>
              )
           }
          </div>
         </div>
      </div>  
        {/* Confirm Modal */}
        {isModalOpen && (
        <ConfirmModal 
          onClose={() => setIsModalOpen(false)} 
          onConfirm={() => handleRemoveProduct(productToRemove)} 
        />
       )}
    </div>
  )
}

export default AddToCartProducts
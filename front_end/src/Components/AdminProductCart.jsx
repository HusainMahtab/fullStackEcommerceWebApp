import React, { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import ConfirmModal from './ConfirmModal'; 
import displayINRCurrency from '../helpers/displayCurrencyThemes';

function AdminProductCart({ productData, fetchAllProduct }) {
  const [editProduct, setEditProduct] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleDeleteProduct = async () => {
    const productId = productData._id;
    //console.log("productid", productId);

    try {
      const response = await axios.delete(`${import.meta.env.BASE_URL}/api/v1/products/deleteProduct/${productId}`, { withCredentials: true });
      toast.success(response.data.message);
      fetchAllProduct();
    } catch (error) {
      console.log("error while deleting product", error);
      toast.error("error while deleting product");
    }
    setIsModalOpen(false); 
  };

  return (
    <div className='bg-white rounde p-4 shadow-lg rounded-md'>
      <div className="w-40">
         <div className="w-32 h-32 flex justify-center items-center">
           <img src={productData.productImage[0]} alt="product" className='mx-auto object-fill h-full'/>
         </div>
        <h2>{productData.productName}</h2>
        <h1 className="font-bold text-xs">{displayINRCurrency(productData.price)}</h1>
        <div className="flex gap-2">
          <div className="w-fit ml-auto p-1 bg-green-200 rounded-full cursor-pointer hover:bg-green-600 hover:text-white" onClick={() => setEditProduct(true)}>
            <CiEdit />
          </div>
          <div className="p-1 bg-red-200 rounded-full cursor-pointer hover:bg-red-600 hover:text-white" onClick={() => setIsModalOpen(true)}>
            <MdDeleteOutline/>
          </div>
          <Toaster/>
        </div>
      </div>
      {editProduct && (
        <AdminEditProduct onClose={() => setEditProduct(false)} Data={productData} fetchAllProduct={fetchAllProduct} />
      )}

      {/* Render the modal */}
      {isModalOpen && <ConfirmModal
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteProduct}
      />
      }
    </div>
  );
}

export default AdminProductCart;

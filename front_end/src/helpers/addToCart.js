import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
const addToCart=async(e,_id,user)=>{
    e?.preventDefault();
    e?.stopPropagation();
   try {
  
     const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/carts/addToCart`,
        {
          productId:_id,
          userId:user._id,
          quantity:1
        },
     {withCredentials:true})
     console.log("add to cart response",response)
     if(response?.data.success===true){
        toast.success(response.data?.message)
     }
     return response.data
     
   } catch (error) {
      console.error("error while add to cart product",error)
      toast.error("product Already Added, or you not login!")
   }
}

export default addToCart
import axios from "axios"
import toast from "react-hot-toast"

const orderProduct=async(_id,data)=>{
   try {
      const order=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/orders/order`,data,{withCredentials:true})
      console.log("order",order)
   } catch (error) {
     console.error("error while buy product",error)
   }
}

export default orderProduct
import axios from "axios"
const url=`https://api.cloudinary.com/v1_1/ddnma8zgs/image/upload`

const uploadImage=async(image)=>{
     const formData=new FormData()
     formData.append("file",image)
     formData.append("upload_preset","my_ecommerce")

     const dataResponse=await axios.post(url,formData)
     return dataResponse
}

export default uploadImage
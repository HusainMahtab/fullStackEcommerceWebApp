import React, { useEffect, useState } from 'react';
import ROLE from '../common/role';
import { FaWindowClose } from 'react-icons/fa';
import axios from "axios"
import toast from "react-hot-toast"

function ChangeUserRole({
  _id,
  userName,
  email,
  role,
  onClose
}) {
  
  const [userRole,setUserRole]=useState(role)
  
  const handleOnChangeSelect=(e)=>{
    setUserRole(e.target.value)
    //console.log("change role",e.target.value)
  }

  const updateUsersRole=async()=>{
    try {
       const responce=await axios.put(`$http://localhost:3000/api/v1/users/update_user`,{role:userRole,_id,email,userName},{withCredentials:true})
       console.log("update role responce",responce)
       onClose()
       toast.success(responce.data.message)
    } catch (error) {
       console.log("error while updateing user role",error?.message)
       toast.error("User Role Not Updated!")
    }
  }
  

  return (
    
      <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-80'>
        <div className='mx-auto bg-white shadow-lg p-4 w-64 max-w-sm'>
          <button className='block ml-auto text-red-600 hover:text-red-700'>
            <FaWindowClose onClick={onClose}/>
          </button>
           
          <h1 className='font-bold'>Change User Role</h1>
          <p>UserName:{userName}</p>
          <p>Email:{email}</p>
          <div className='flex item-center justify-between my-2'>
            <p>Role:</p>
            <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
              {Object.values(ROLE).map((ele, index) => (
                <option value={ele} key={index}>
                  {ele}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex justify-center">
             <button className='w-fit max-auto block py-1 px-2 mx-6 rounded-full bg-gray-500 hover:bg-gray-600 text-white' onClick={updateUsersRole}>
              Change Role
             </button>
          </div>
         
        </div>
      </div>
    )
  
}

export default ChangeUserRole;

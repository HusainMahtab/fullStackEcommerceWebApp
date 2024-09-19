import React, { useEffect, useState } from 'react'
import axios from "axios"
import moment from "moment"
import { FaUserEdit } from "react-icons/fa";
import ChangeUserRole from '../Components/ChangeUserRole';
import Loader from '../Components/Loader';



function AllUsers() {
 const [getUsers,setgetUser]=useState([])
 const [openUpdateRole,setOpenUpdateRole]=useState(false)
 const [loading,setLoading]=useState(true)
 const [updateUserDetails,setUpdateUserDetails]=useState({
  _id:"",
  userName:"",
  email:"",
  role:""
 })

 const getAllUsers=async()=>{
     try {
         const responce=await axios.get(`https://fullstackecommercewebapp.onrender.com/api/v1/users/all_users`,{withCredentials:true})
         console.log("GetAllUsers",responce.data.data)
         setgetUser(responce?.data?.data)
         setLoading(false)
     } catch (error) {
         console.log("error while fetching AllUsers",error?.message)
     }
 }

 useEffect(()=>{
    getAllUsers()
 },[])
      
  

  return (
    <div className='bg-white pb-4 w-full flex items-center'>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-gray-800 text-white'>
            <th>Sr.</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
            </tr>
        </thead>
        
           {
            loading ?  (<Loader/>) : (
              <tbody>
              {
              getUsers.map((ele,index)=>{
               return (
                <tr key={index}>
                  <td>
                    {index+1}
                  </td>
                  <td>
                    {ele?.userName}
                  </td>
                  <td>
                    {ele?.email}
                  </td>
                  <td>
                    {ele?.role}
                  </td>
                  <td>
                    {moment(ele?.createdAt).format('LL')}
                  </td>
                  <td className='cursor-pointer text-blue-700 hover:text-blue-800'>
                    <button>
                     <FaUserEdit className='text-xl' onClick={()=>{
                      setUpdateUserDetails(ele)
                      setOpenUpdateRole(true)
                      }}/>

                    </button>
                  </td>
                  
                </tr>
              )
            })
          }
              </tbody>
            )
           }
          
        
      </table>
      {
        openUpdateRole && (
           <ChangeUserRole 
             onClose={()=>setOpenUpdateRole(false)}
             userName={updateUserDetails.userName}
             email={updateUserDetails.email}
             role={updateUserDetails.role}
             _id={updateUserDetails._id}
           />
        )
      }
     
    </div>
  )
}

export default AllUsers
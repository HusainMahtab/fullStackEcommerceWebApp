import React, { useEffect, useState } from 'react'
import axios from "axios"
import moment from "moment"
import { FaUserEdit } from "react-icons/fa";
import ChangeUserRole from '../Components/ChangeUserRole';
import Loader from '../Components/Loader';
import toast from 'react-hot-toast';
import ConfirmModal from '../Components/ConfirmModal';

function AllUsers() {
 const [getUsers,setgetUser]=useState([])
 const [openUpdateRole,setOpenUpdateRole]=useState(false)
 const [loading,setLoading]=useState(true)
 const [confirmModal, setConfirmModal] = useState({ isOpen: false, userId: null });
 const [loader,setLoader]=useState(false)
 const [updateUserDetails,setUpdateUserDetails]=useState({
  _id:"",
  userName:"",
  email:"",
  role:""
 })

 const getAllUsers=async()=>{
     try {
         const responce=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/all_users`,{withCredentials:true})
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
      
 const handleDeleteUser=async(_id)=>{
     setLoader(true)
    try {
      const response=await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/users/delete_user/${_id}`,{withCredentials:true})
      console.log("delete user",response)
      toast.success(response?.data?.message)
      setLoader(false)
      setgetUser((prevUser)=>prevUser.filter((user)=>user._id!==_id))
    } catch (error) {
      console.error("user deleted successfuly")
      toast.error("user not deleted!")
      setLoader(false)
    }
 }
  

  return (
    <div className='bg-white pb-4 w-full flex items-center overflow-x-hidden'>
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
                  <td className='flex justify-center items-center gap-3 cursor-pointer text-blue-700 hover:text-blue-800'>
                    <button>
                     <FaUserEdit className='text-xl' onClick={()=>{
                       setUpdateUserDetails(ele)
                       setOpenUpdateRole(true)
                      }}/>

                    </button>
                    {
                      ele.role!=="ADMIN"&&(
                         <div className="">
                            {
                              loader ? (
                                <div className="">
                                    <div className="flex justify-center items-center bg-red-600">
                                      <div className="p-1 border-b border-b-white rounded-full animate-spin"></div>
                                    </div>
                                </div>
                              ) : (
                                 <button  onClick={() => setConfirmModal({ isOpen: true, userId: ele._id })} className="p-1 bg-red-600 text-white rounded hover:bg-red-500">Delete</button>

                              )
                            }
                         </div>                          
                      )
                    }
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
      {confirmModal.isOpen && (
        <ConfirmModal
          onClose={() => setConfirmModal({ isOpen: false, userId: null })}
          onConfirm={() => {
            handleDeleteUser(confirmModal.userId);
            setConfirmModal({ isOpen: false, userId: null });
          }}
        />
      )}
     
    </div>
  )
}

export default AllUsers
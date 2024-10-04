import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";
import {Link,Outlet} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import ROLE from '../common/role';
function AdminPanel() {

    const user=useSelector(state=>state?.user?.user)
    const navigate=useNavigate()

    useEffect(()=>{
       if(user?.role!==ROLE.ADMIN){
        navigate("/")
       }
    },[user])
    

  return (
    <div className='h-96 my-16 sm:flex hidden w-full'>
        <aside className='min-h-full w-full max-w-60 shadow-lg'>
          <div className='h-28 flex justify-center items-center flex-col'>
            <div
               className='relative text-5xl text-gray-500 cursor-pointer justify-center flex mt-8'
               onClick={()=>setShowMenu(pre=>!pre)}
             >
               {
                 user?.profilePic ? (
                 <img className="rounded-full w-16 h-16" src={user?.profilePic} alt={user?.name}/>
                ):(<FaUserCircle className='hover:text-gray-600' />)
               }
            </div>
            <p className='capitalize text-lg front font-semibol '>{user?.userName}</p>
            <p className='text-sm text-slate-500'>{user?.role}</p>
            {/* <p>{user?.email}</p> */}
          </div>

          {/* navigation */}
          <div>
             <nav className='flex flex-col justify-center p-4 '>
                <Link to="all_users" className='py-1 hover:bg-slate-100 px-2 rounded-md font-serif'>All Users</Link>
                <Link to="all_product" className='py-1 hover:bg-slate-100 px-2 rounded-md font-serif' >All Product</Link>
                <Link to="all_user_messages" className='py-1 hover:bg-slate-100 px-2 rounded-md font-serif' >All Users Messages</Link>
             </nav>
          </div>
        </aside>
        <main className='bg-slate-100 w-full h-full p-2 overflow-scroll overflow-x-hidden mr-2'>
              <Outlet/>
        </main> 
    </div>
  )
}

export default AdminPanel
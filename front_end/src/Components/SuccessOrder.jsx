import React from 'react'
import { FcOk } from "react-icons/fc";
import { TbClockFilled } from "react-icons/tb";
function SuccessOrder() {
  return (
    <div>
        <div className='w-full h-[60vh] bg-green-700 text-white font-bold flex justify-center items-center flex-col'>
           <div className='flex justify-center items-center gap-2'>
             <p>Your Order is Confirmed</p>
             <FcOk className='text-white font-bold text-xl'/>
           </div>
            <div className='flex justify-center items-center gap-2'>
              <p>wait for placement.</p>
              <TbClockFilled className='text-2xl text-white bg-green-700 font-bold animate-spin'/>
            </div>
            <p>Thank You</p>
            <p className='font-bold text-xl text-yellow-300'>Ready your Case.</p>
            <p>By-<span className='text-lg font-serif'>Mahtab Husain</span></p>
        </div>
    </div>
  )
}

export default SuccessOrder
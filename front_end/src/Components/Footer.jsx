import React from 'react'
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';
function Footer() {
  return (
     <footer className="bg-gray-500 p-10 text-white">
       <div className="container mx-auto">
          
        <div className="w-full h-full flex justify-between items-center gap-2">
            <div className="w-full">
              <h2 className='text-xl font-bold'>Other Products</h2>
              <Link onClick={()=>window.open("https://school-website-theta-three.vercel.app/","_blank")} className='text-white font-semibold border-b-2 border-transparent hover:border-white transition-all duration-300'>schoolwebSite</Link>

            </div>
             <div className="bg-blue-400 w-full h-full">sdf</div>
             <div className="w-full grid gap-2 justify-center ">
                <Link  onClick={() => window.open("https://github.com/HusainMahtab", "_blank")} className='flex items-center gap-2 border-b-2 border-transparent hover:border-white transition-all duration-300'>
                  <FaSquareGithub className='text-2xl font-bold'/> 
                  <p className='text-lg font-semibold'>Github</p>
                </Link>
                <Link onClick={() => window.open("https://www.instagram.com/mahtab.husain.1401/", "_blank")} className='flex items-center gap-2 border-b-2 border-transparent hover:border-white transition-all duration-300'>
                  <FaInstagramSquare className='text-2xl font-bold'/> 
                  <p className='text-lg font-semibold'>Instagram</p>
                </Link>
                <Link onClick={() => window.open("https://www.facebook.com/mahtab.husain.1401/", "_blank")} className='flex items-center gap-2 border-b-2 border-transparent hover:border-white transition-all duration-300'>
                  <FaFacebookSquare className='text-2xl font-bold'/> 
                  <p className='text-lg font-semibold'>Facebook</p>
                </Link>
             </div>
        </div>
          
       </div>
     </footer>
  )
}

export default Footer
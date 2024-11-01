import React from 'react'
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';
function Footer() {
  return (
     <footer className="bg-gray-500 text-white p-2 px-4 py-8">
       <div className="container mx-auto">
          
        <div className="w-full h-full grid md:flex justify-between items-center gap-2">
            <div className="w-full grid justify-center place-content-center">
              <h2 className='text-xl font-bold font-serif'>Other Products</h2>
              <Link onClick={()=>window.open("https://school-website-theta-three.vercel.app/","_blank")} className='text-white font-semibold border-b-2 border-transparent hover:border-white transition-all duration-300 w-fit'>schoolwebSite</Link>
              <Link onClick={()=>window.open("todowithmahtab.netlify.app","_blank")} className='text-white font-semibold border-b-2 border-transparent hover:border-white transition-all duration-300 w-fit'>todo-app</Link>
              <Link onClick={()=>window.open("https://nimesh-portfolio-c40y.onrender.com/","_blank")} className='text-white font-semibold border-b-2 border-transparent hover:border-white transition-all duration-300 w-fit'>NimeshPortfolio</Link>
            </div>
             <div className="w-full grid gap-1 justify-center place-content-center">
                <h2 className='text-xl font-bold text-white font-serif'>Developer</h2>
                <Link to={"/about_me"} className='text-md w-fit font-semibold text-white border-b-2 border-transparent hover:border-white transition-all duration-300'>
                   About-Me
                </Link>
                <Link to={"/contact_me"} className='text-md w-fit font-semibold text-white border-b-2 border-transparent hover:border-white transition-all duration-300'>
                  Contact-Me
                </Link>
                <Link onClick={()=>window.open("https://my-portfolio-v3ie.onrender.com/","_blank",)} className='text-md w-fit font-semibold text-white border-b-2 border-transparent hover:border-white transition-all duration-300'>
                  Portfolio
                </Link>
                <p className='font-bold'>+91 9118168704</p>
             </div>
             <div className="w-full grid justify-center gap-1 place-content-center">
                <h2 className='text-xl font-bold font-serif'>Availble on</h2>
                <Link  onClick={() => window.open("https://github.com/HusainMahtab", "_blank")} className='flex items-center gap-2 border-b-2 border-transparent hover:border-white transition-all duration-300'>
                  <FaSquareGithub className='text-2xl font-bold'/> 
                  <p className='text-md font-semibold'>Github</p>
                </Link>
                <Link onClick={() => window.open("https://www.instagram.com/mahtab.husain.1401/", "_blank")} className='flex items-center gap-2 border-b-2 border-transparent hover:border-white transition-all duration-300'>
                  <FaInstagramSquare className='text-2xl font-bold'/> 
                  <p className='text-md font-semibold'>Instagram</p>
                </Link>
                <Link onClick={() => window.open("https://www.facebook.com/mahtab.husain.1401/", "_blank")} className='flex items-center gap-2 border-b-2 border-transparent hover:border-white transition-all duration-300'>
                  <FaFacebookSquare className='text-2xl font-bold'/> 
                  <p className='text-md font-semibold'>Facebook</p>
                </Link>
             </div>
        </div>
          
       </div>
     </footer>
  )
}

export default Footer
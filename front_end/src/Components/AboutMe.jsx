import React from 'react'
function AboutMe() {
  return (
    <div className='w-full flex flex-col md:flex-row justify-center items-center p-8'>
        <div className="w-full bg-[#00ff99] h-[400px] grid justify-center place-content-center p-4 shadow-lg">
            <h1 className='text-2xl font-bold text-white text-center'>About Me</h1>
            <p className='text-lg font-semibold text-white font-serif p-4'>Hello,I'm Mahtab Husain Web developer with a keen eye for MERN Stack. with a background in IT,I strive to create impectful and visually stunning software solutios that leave a lasting impression.</p>
        </div>
        <div className="w-full bg-white md:h-[450px] h-[550px] p-8 shadow-lg">
             <div className='flex justify-center'>
               <img src="https://my-portfolio-v3ie.onrender.com/assets/my-image-D6x7PDlK.jpg" alt="developer image" className='w-40 h-40 rounded-full'/>  
             </div>
             <p className='font-semibold text-md p-2'>Over 3 month of hands-on internship experience in full-stack development.Proficient in diverse projects including a E-Commerce Management System,E-Learning Back-End System,School-WebApp,Successfully intergrated payment systems like Razorpay.</p>
        </div>
    </div>
  )
}

export default AboutMe
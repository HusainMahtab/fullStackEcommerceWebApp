import { useState } from "react"
import banner1 from "../assets/Banners/banner1.avif"
import banner2 from "../assets/Banners/banner2.avif"
import banner3 from "../assets/Banners/banner3.avif"
import banner4 from "../assets/Banners/banner4.avif"
// import banner5 from "../assets/Banners/banner5.avif"
// import banner6 from "../assets/Banners/banner6.avif"
// import banner7 from "../assets/Banners/banner7.avif"
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { useEffect } from "react"

const BannerProduct=()=>{
   
    const [currentImage, setCurrentImage]=useState(0)
    const destopBannerImages=[
        banner1,
        banner2,
        banner3,
        banner4
    ]

    const nextBanner=()=>{
        if(destopBannerImages.length-1 > currentImage){
            setCurrentImage(pre=>pre+1)
        }
    }
    const previosBanner=()=>{
        setCurrentImage(currentImage-1)
        if(currentImage===0){
            setCurrentImage(currentImage)
        }
    }

    // slide banner image 
    useEffect(()=>{
        const interval=setInterval(()=>{
            if(destopBannerImages.length-1 > currentImage){
                nextBanner()
            }else{
                setCurrentImage(0)
            }
        },2000)
        return ()=>clearInterval(interval)
    })

    return(
        <div className="container mx-auto my-2 px-2">
            <div className="h-60 md:h-72 w-full bg-slate-200 relative overflow-hidden">
              <div className="absolute w-full h-full md:flex items-center hidden">
                 <div className="flex justify-between w-full text-2xl">
                   <button className="bg-white rounded-full mx-1 hover:bg-slate-300" onClick={previosBanner}><FaAngleLeft/></button>
                   <button className="bg-white rounded-full mx-1  hover:bg-slate-300" onClick={nextBanner}><FaAngleRight/></button>
                 </div>
              </div>
              <div className="flex w-full h-full">
                {
                  destopBannerImages.map((images,index)=>(
                   <div className="w-full h-full min-w-full min-h-ful transition-all" key={index+1} style={{transform:`translateX(-${currentImage*100}%`}}>
                     <img className="w-full h-full" src={images}/>
                   </div>
                  ))
                }
              </div>
                
            </div> 
        </div>
    )
}


export default BannerProduct



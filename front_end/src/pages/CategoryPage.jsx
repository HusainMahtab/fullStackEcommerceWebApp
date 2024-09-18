import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate,} from 'react-router-dom'
import productCategory from "../helpers/productCategory"
import axios from "axios"
import VerticalCart from '../Components/VerticalCart'
function CategoryPage() {
    const loacation=useLocation()
    const urlSearch= new URLSearchParams(loacation.search)
    const urlCategoryListArray=urlSearch.getAll("category")
    const urlCategoryListObject={}
    urlCategoryListArray.forEach((ele)=>{
      urlCategoryListObject[ele]=true
    })
    console.log("urlCategoryListArray",urlCategoryListObject)
    const [data,setData]=useState([])
    const [loading,setloading]=useState(true)
    const [selectCategory,setSelectCategory]=useState(urlCategoryListObject)
    const [filterCategoryList,setFilterCategoryList]=useState([])
    const navigate=useNavigate()
    const [sortBy,setSortBy]=useState("")
    const showProductWithCategory=async()=>{
      try {
        const respnose=await axios.get(`http://localhost:3000/api/v1/products/filterProduct`,{
          params: {
             category: filterCategoryList
          },
          withCredentials:true
        })
         setData(respnose.data.data)
         setloading(false)
        //console.log("categoryProduct respose",respnose)
      } catch (error) {
         console.error("error while fetched category wise product")
      }
    }

    useEffect(()=>{
       showProductWithCategory()
    },[filterCategoryList])
    useEffect(()=>{
      const arrayOfCategory=Object.keys(selectCategory).map((categoryKeyName)=>{
        if(selectCategory[categoryKeyName]){
          return categoryKeyName
        }
        return null
      }).filter((el)=>el)
      setFilterCategoryList(arrayOfCategory)

      // url formater when change the checkbox
      const urlFormater=arrayOfCategory.map((el,index)=>{
        if((arrayOfCategory.length-1)===index){
          return `category=${el}`
        }
        return `category=${el}&&`
      })
       navigate("/product_category?"+urlFormater.join(""))
       //console.log("selected Category",arrayOfCategory)
       
    },[selectCategory])

   

    const handleSelectCategory=(e)=>{
      const {name,value,checked}=e.target
      setSelectCategory((prev)=>{
        return {
          ...prev,
          [value]:checked
        }
      })
     // console.log("selected category",selectCategory)
    }

    const handleChangeShortBy=(e)=>{
      const {value}=e.target
      if(value==="asc"){
         setData((prev)=>prev.sort((a,b)=>a.sellingPrice-b.sellingPrice))
      }
     if(value==="dsc"){
      setData((prev)=>prev.sort((a,b)=>b.sellingPrice-a.sellingPrice))
     }
     setSortBy(value)
   }
    useEffect(()=>{
      
    },[sortBy])
  return (
    <div className='container mx-auto p-4'>
        {/* dextop version */}
        <div className="hidden md:grid grid-cols-[200px,1fr]">
            {/* left side */}
            <div className="bg-gray-500 p-1 min-h-[calc(100vh-170px)] overflow-y-scroll scrollbar-hide">
               {/* short by */}
               <div className="">
                  <h3 className="text-base font-medium text-white uppercase border-b border-slate-300 ">Sort By</h3>
                  <form className="text-sm flex flex-col gap-1 py-2">
                    <div className='flex items-center gap-2'>
                      <input className="cursor-pointer" type='radio' checked={sortBy==="asc"} name='sortBy' value={"asc"} onChange={handleChangeShortBy}/>
                      <label htmlFor="" className='text-slate-200'>Price-Low to High</label>
                    </div>
                    <div className='flex items-center gap-2'>
                      <input className="cursor-pointer" type='radio' checked={sortBy==="dsc"} name='sortBy' value={"dsc"} onChange={handleChangeShortBy}/>
                      <label htmlFor="" className='text-slate-200'>Price-High to Low</label>
                    </div>
                  </form>
               </div>
               {/* filter by */}
               <div className="">
                  <h3 className="text-base font-medium text-white uppercase border-b border-slate-300 ">Category</h3>
                  <form className="text-sm flex flex-col gap-1 py-2">
                     {
                      productCategory.map((categoryName,index)=>(
                        <div key={index+1} className='flex items-center gap-2'>
                           <input type="checkbox" name={"category"} id={categoryName?.value} checked={selectCategory[categoryName?.value]} value={categoryName?.value} onChange={handleSelectCategory}/>
                           <label htmlFor={categoryName?.value} className=' text-slate-200'>{categoryName?.label}</label>
                        </div>
                      ))
                     }
                  </form>
               </div>
            </div>
            {/* right side (products) */}
            <div className="">
                <p className='text-lg font-semibold text-gray-600 text-center pb-2'>Searched Result: {data.length}</p>
                <div className='min-h-[calc(100vh-170px)] max-h-[calc(100vh-120px)] overflow-y-scroll'>
                  {
                    data.length!==0 &&(
                      <VerticalCart loading={loading} data={data}/>
                   )      
                  }
                </div>
            </div>
        </div>
    </div>
  )
}

export default CategoryPage
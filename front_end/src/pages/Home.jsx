import React from 'react'
import CategoryList from '../Components/CategoryList'
import BannerProduct from "../Components/BannerProduct"
import ShowCategoryWiseProduct from '../Components/ShowCategoryWiseProduct'
import VerticalProductCart from '../Components/VerticalProductCart'
function Home() {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <ShowCategoryWiseProduct category={"airpodes"} heading={"Top's Airpodes"}/>
      <ShowCategoryWiseProduct category={"watches"} heading={"Popular's Watches"}/>
      <ShowCategoryWiseProduct category={"speakers"} heading={"Best's Speakers"}/>
      <ShowCategoryWiseProduct category={"earphone"} heading={"Best's Earphones"}/>
      <VerticalProductCart category={"mobiles"} heading={"Latest's Mobiles"}/>
      <VerticalProductCart category={"mouse"} heading={"Latest's Mouse"}/>
      <VerticalProductCart category={"televisions"} heading={"Popular's Televisions"}/>
      <VerticalProductCart category={"camera"} heading={"Camera & Photography"}/>
      <VerticalProductCart category={"printers"} heading={"Latest's Printers"}/>
      <VerticalProductCart category={"refrigerator"} heading={"Latest's refrigerator"}/>
      <VerticalProductCart category={"trimmers"} heading={"Latest's Trimmers"}/>\
      <VerticalProductCart category={"shirt"} heading={"Style & Fashion's"}/>
      <VerticalProductCart category={"t-shirt"} heading={"Style & Fashion's"}/>
      
    </div>
  )
}

export default Home
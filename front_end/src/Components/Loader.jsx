import React from 'react'

function Loader() {
  return (
  <div className=" w-full h-full flex justify-center items-center">
    <div className="loader ">
    <span className="loader-text mb-2 text-center w-full">loading,wait...</span>
    <span className="load"></span>
  </div>
  </div>  
  
  )
}

export default Loader
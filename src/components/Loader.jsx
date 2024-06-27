import React from 'react'
import "../assets/CSS/loader.css"

function Loader() {
  return (
    <>
    <div className='flex justify-center items-center'>
        <div className="loader">
            <label className='labels'>Please wait...</label>
            <div className="loading"></div>
        </div>
    </div>
    </>

  )
}

export default Loader
import React from 'react'
import meatBan from './eggs.jpg'
import './banner.css'

const Banner = () => {
  return (
    <div className='banner'>
        <div className="banner_info">
            <h1>24/7 SERVICES 100%</h1>
            <h2>Free Shipment</h2>
             <button>Explore Now</button>

        </div>

        <div className="banner_photo">
            <img src = {meatBan} alt="" />
        </div>
        
    </div>
  )
}

export default Banner
import React from 'react'
import './Footer.css'
import footer_logo from '../Asset/logo_big.png'
import instagram from '../Asset/instagram_icon.png'
import pinterest from '../Asset/pintester_icon.png'
import whatsup from '../Asset/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer_logo">
            <img src=  {footer_logo} alt="" />
            <p>Shopper</p>
        </div>
        <ul className="footer_link">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer_social_icon">
            <div className="social_icon_container">
                <img src = {instagram} alt="" />
            </div>
            <div className="social_icon_container">
                <img src = {pinterest} alt="" />
            </div>
            <div className="social_icon_container">
                <img src = {whatsup} alt="" />
            </div>
        </div>

        <div className="footer_copy_right">
            <hr />
            <p>Copyright @ 2025 - All right Reserved</p>
        </div>
    </div>
  )
}

export default Footer
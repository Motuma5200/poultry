import React from 'react'
import './Hero.css'
import hand_icon from '../Asset/hand_icon.png'
import arrow from '../Asset/arrow.png'
import hero_img from '../Asset/hero.jpg'

const Hero = () => {
  return (
    <div className='hero'>

        <div className="hero_left">
            <h2>Best Nutrition For All</h2>
            <div className='hero_left_text'>
                <div className="hand_icon">
                    <p>New</p>
                    <img className='h_icon' src = {hand_icon} alt="" />
                </div>
                <p>Collection</p>
                <p>All Needs</p>
            </div>
            <div className="hero_latest_btn">
                <a href="#popular">
                <div>Latest Collection </div>
                <img src= {arrow} alt="" />
                </a>
                
            </div>
        </div>

        <div className="hero_right">
        <img className='hero_img' src= {hero_img} alt="" />
        </div>

    </div>
  )
}

export default Hero
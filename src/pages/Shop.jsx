import React from 'react'
import Hero from '../components/Hero/Hero'
import Popular from '../components/popular/Popular'
import NewsLetter from '../components/newsLetter/NewsLetter'

function Shop() {
  return (
    <div className='shop'>
      <Hero/>
      <div id='popular'>
              <Popular/>
      </div>
     
      <NewsLetter/>
    </div>
  )
}

export default Shop

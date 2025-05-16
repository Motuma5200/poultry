import React from 'react'
import { Link } from 'react-router-dom';
import './Item.css';

const Item = (props) => {
  return (
    <div className='item'>
       <div className='item_image'>
       <Link to = {`/product/${props.id}`}>
        <img className='productImage' onClick={()=>window.scrollTo(0,0)} src= {props.image} alt="" />
       </Link> 
       </div>
       <div className="item_info">
       <p className='item_name'>{props.name}</p>

        <div className="item_weight">
              Weight: {props.weight}Kg
              </div>

          <div className="item_prices">

              <div className="item_new_price">
                    ${props.new_price}
               </div>

              <div className="item_old_price">
                     ${props.old_price}
              </div>
          </div>

       </div>


       
    </div>
  )
}

export default Item
import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../Asset/star_icon.png';
import star_doll_icon from '../Asset/star_dull_icon.png';
import { ShopContext } from '../../context/ShopContext';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1); // State to track the input quantity

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product.id, quantity); // Pass the product ID and quantity to the addToCart function
    } else {
      alert("Please enter a valid quantity.");
    }
  };

  return (
    <div className='productdisplay'>
      <div className="productdisplay_left">
        <img src={product.image} alt="" className="product_image" />
      </div>

      <div className="productdisplay_right">
        <h2>{product.name}</h2>
        <div className="product_stars">
          <p>Rate</p>
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_doll_icon} alt="" />
        </div>
        <div className="product_prices">
          <div className="procuct_oldprice">{product.old_price} Birr</div>
          <div className="product_newprice">{product.new_price} Birr</div>
        </div>

        <div className="product_description">
          This product is very nutritious food for a healthy and wealthy life.
          The access to this indigenous product is affordable depending on 
          our people's income.
        </div>

        <div className="cart_controls">
          <label for = 'quantity' className='quantity_label'>Quantity  </label>
          <input
            type="number"
            min="1"
            name='quantity'
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} // Ensure valid number
            className="quantity_input"
          />
          <button className='cart_btn' onClick={handleAddToCart}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
import React, { useContext } from "react";
import "./Cartitems.css";
import { ShopContext } from "../../context/ShopContext";
import remove_icon from "../Asset/cart_cross_icon.png";
import { useNavigate } from "react-router-dom";

const Cartitems = () => {
  const { totalAmount, allProducts, cartItems, removeFromCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (totalAmount > 0) {
      navigate("/payment");
    } else {
      alert("Please add items to your cart before proceeding to checkout.");
    }
  };

  return (
    <div className="CartItems">
      <div className="cartitems_format_main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {allProducts.length > 0 ? (
        allProducts.map((e) => {
          if (cartItems[e.id] > 0) {
            return (
              <div key={e.id}>
                <div className="cartItem_format cartitems_format_main">
                  <img src={e.image} alt="" className="carticon_product_icon" />
                  <p>{e.name}</p>
                  <p>{e.new_price} Birr</p>
                  <button className="cartItem_quantity">{cartItems[e.id]}</button>
                  <p>{e.new_price * cartItems[e.id]} Birr</p>
                  <img
                    className="remove_icon"
                    src={remove_icon}
                    onClick={() => {
                      removeFromCart(e.id);
                    }}
                    alt=""
                  />
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })
      ) : (
        <p>Loading products...</p>
      )}
      <div className="cartItems_down">
        <div className="cartItems_total">
          <h1 className="total_tittle">Cart Totals</h1>
          <div>
            <div className="cartitems_total_item">
              <p>Subtotal</p>
              <p>{totalAmount} Birr</p>
            </div>
            <hr />
            <div className="cartitems_total_item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems_total_item">
              <p>Total</p>
              <h3>{totalAmount} Birr</h3>
            </div>
          </div>
          <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cartitems;
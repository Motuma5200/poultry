import React, { useState, useEffect } from 'react';
import './Popular.css';
import Item from '../items/Item';

const Popular = () => {
  const [products, setProducts] = useState([]);

  // Fetch top 6 products from the backend
  useEffect(() => {
    fetch('http://localhost/poultry/getTopProducts.php') // Replace with your backend endpoint
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.slice(0, 6)); // Limit to top 6 products
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className='popular'>
      <h1>TOP LATEST PRODUCTS</h1>
      <hr />

      <div className="popular_items">
        {products.map((item, i) => (
          <Item
          key={i}
          id={item.id}
          name={item.name}
          image={item.image}
          weight={item.weight}
          new_price={item.new_price}
          old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
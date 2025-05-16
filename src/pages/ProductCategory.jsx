import React, { useContext, useState, useEffect } from 'react';
import './CSS/ProductCategory.css';
import { ShopContext } from "../context/ShopContext";
import Item from '../components/items/Item';
import right_arrow_icon from '../components/Asset/arrow.png';

const ProductCategory = (props) => {
  const { allProducts } = useContext(ShopContext);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOption, setSortOption] = useState("latest");

  // Automatically swap banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % props.banner.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [props.banner]);

  // Manual swap to the next banner
  const handleNextBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % props.banner.length);
  };

  // Sort products whenever the sort option or allProducts changes
  useEffect(() => {
    let sorted = [...allProducts];

    if (sortOption === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "Priceup") {
      sorted.sort((a, b) => a.new_price - b.new_price);
    } else if (sortOption === "pricedown") {
      sorted.sort((a, b) => b.new_price - a.new_price);
    } else if (sortOption === "latest") {
      sorted.sort((a, b) => new Date(b.date_added) - new Date(a.date_added)); // Assuming `date_added` exists
    } else if (sortOption === "popular") {
      sorted.sort((a, b) => b.popularity - a.popularity); // Assuming `popularity` exists
    }

    setSortedProducts(sorted);
  }, [sortOption, allProducts]);

  return (
    <div className="product_category">
      <div className="product_banner_container">
        <img
          className="product_banner"
          src={props.banner[currentBannerIndex]}
          alt={`Banner ${currentBannerIndex + 1}`}
        />
        <button className="next_banner_button" onClick={handleNextBanner}>
          <img src={right_arrow_icon} alt="Next" />
        </button>
      </div>

      <div className="productCategory_sort_index">
        <p>
          <span>Showing Top 10 </span> out of {allProducts.length} products
        </p>
        <div className="product_category_sort">
          <p> Sort by</p> 
          <select
            className="selectSort"
            name="sorting"
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="name">A - Z</option>
            <option value="Priceup">Price Up</option>
            <option value="pricedown">Price Down</option>
            <option value="latest">Latest</option>
            <option value="popular">Popular</option>
          </select>
        </div>
      </div>

      <div className="shopProduct_category">
        {sortedProducts.map((item, i) => {
          if (
            item.category === props.category &&
            (!props.subCategory || item.subcategory === props.subCategory)
          ) {     
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                weight={item.weight}
                new_price={item.new_price}
                old_price={item.old_price}
              />
             
            );
          } else {
            return null;
          }
        })}
      </div>

      <div className="product_loadmore">Explore More</div>
    </div>
  );
};

export default ProductCategory;
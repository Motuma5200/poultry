import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [totalAmount, setTotalAmount] = useState(0); // Track total cart amount

  // Fetch products and cart items
  useEffect(() => {
    const fetchProductsAndCart = async () => {
      try {
        // Fetch products
        const productsResponse = await fetch("http://localhost/poultry/fetchProducts.php");
        if (!productsResponse.ok) {
          throw new Error(`Failed to fetch products: ${productsResponse.status}`);
        }
        const productsData = await productsResponse.json();
        console.log("All Products:", productsData);
        setAllProducts(productsData);

        // Initialize cart items
        const initialCart = {};
        productsData.forEach((product) => {
          initialCart[product.id] = 0;
        });

        // Fetch cart items if the user is logged in
        if (isLoggedIn) {
          const cartResponse = await fetch("http://localhost/poultry/getCart.php", {
            credentials: "include", // Include cookies for session handling
          });
          if (!cartResponse.ok) {
            throw new Error(`Failed to fetch cart: ${cartResponse.status}`);
          }
          const cartData = await cartResponse.json();
          console.log("Cart data:", cartData);

          // Update cart items with quantities from the backend
          const updatedCart = { ...initialCart };
          cartData.forEach((item) => {
            updatedCart[item.product_id] = item.quantity;
          });
          setCartItems(updatedCart);

          console.log("Updated Cart Items:", updatedCart);
        } else {
          setCartItems(initialCart);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProductsAndCart();
  }, [isLoggedIn]); // Refetch cart items when login status changes


  // Recalculate total amount whenever cartItems or allProducts change
  useEffect(() => {
    const calculateTotalAmount = () => {
      let total = 0;
  
      if (allProducts.length === 0) {
        console.warn("calculateTotalAmount: allProducts is empty.");
        setTotalAmount(total);
        return;
      }
  
      console.log("Calculating total amount...");
      console.log("Cart Items:", cartItems);
      console.log("All Products:", allProducts);
  
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          const itemInfo = allProducts.find((product) => product.id === item);
          if (itemInfo) {
            console.log(
              `Adding ${itemInfo.new_price} * ${cartItems[item]} for product ID ${item}`
            );
            total += itemInfo.new_price * cartItems[item];
          } else {
            console.warn(`Product with ID ${item} not found in allProducts.`);
          }
        }
      }
  
      console.log("Total Amount Calculated:", total);
      setTotalAmount(total);
    };
  
    calculateTotalAmount();
  }, [cartItems, allProducts]); // Recalculate when cartItems or allProducts change
 
 
  const addToCart = async (itemId, quantity = 1) => {
    try {
      const response = await fetch("http://localhost/poultry/addToCart.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ product_id: itemId, quantity }),
      });
      const result = await response.json();
      console.log(result);
      if (result.result === "Item added to cart") {
        setCartItems((prev) => ({
          ...prev,
          [itemId]: (prev[itemId] || 0) + quantity, // Add the specified quantity
        }));
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await fetch("http://localhost/poultry/removeFromCart.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: itemId }),
      });
      const result = await response.json();
      console.log(result);
      if (result.result === "Item updated in cart") {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const getTotalCartItem = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Set login status to true after successful login
  };

  const contextValue = {
    getTotalCartItem,
    totalAmount, // Expose totalAmount directly
    allProducts,
    cartItems,
    addToCart,
    removeFromCart,
    handleLogin, // Expose login handler
  };

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
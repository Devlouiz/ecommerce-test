import React, { createContext, useState, useEffect } from 'react';
import {toast} from 'react-toastify'

const StateContext = createContext({});

export const StateProvider = ({ children }) => {
    const [products, setProducts] = useState([]);  
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const resetQty = () => setQty(1)

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item.name === product.name);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct.name === product.name) {
          return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      }
      return cartProduct
      })

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    alert(`${qty} ${product.name} added to the cart.`)
  } 

  const onRemove = (product) => {
    let foundProduct = cartItems.find((item) => item.name === product.name);
    const newCartItems = cartItems.filter((item) => item.name !== product.name);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuanitity = (name, value) => {
    let foundProduct = cartItems.find((item) => item.name === name)
    index = cartItems.findIndex((product) => product.name === name);

    const newCartItems = cartItems.map(item => {
      if (item.name === name) {
        let newQuantity = item.quantity
        if (value === 'inc') {
          newQuantity = item.quantity + 1;
        } else if (value === 'dec') {
          newQuantity = item.quantity > 1 ? item.quantity - 1 : 1;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(newCartItems);

    if(value === 'inc') {
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }

  return (
    <StateContext.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        products,
        setProducts,
        resetQty 
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export default StateContext;
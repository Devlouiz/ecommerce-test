import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import useStates from '../hooks/useStates';
import { urlFor } from '../lib/client';
import PaystackPop from '@paystack/inline-js';

const Cart = () => {
    const navigate = useNavigate()
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove, setCartItems, setTotalQuantities } = useStates();

   /* Here we can implement a function to handle cart checkout */
    const handleCheckout = () => {

        const paystack = new PaystackPop()
        paystack.newTransaction({
            key:'pk_test_97de2421ce2fc03addd1b95c8d1b14df4e015ba4',
            amount: totalPrice * 100 * 1200, // Paystack needs the amount in kobo and (* 1200) is times current dollar rate 
            email: 'customer@example.com',
            onSuccess: (transaction) => {
                alert('Payment complete!', transaction);
                setCartItems([]);
                setTotalQuantities(0);
                setShowCart(false);
                navigate('/successfulcheckout');
            },
            onCancel: () => {
                alert('You have cancelled the payment.');
            },
        })
    }
    console.log(cartItems)
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
        type="button"
        className="cart-heading"
        onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link to="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item.name}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                  <p className="quantity-desc">
                    <span className="minus" onClick={() => toggleCartItemQuanitity(item.name, 'dec') }>
                    <AiOutlineMinus />
                    </span>
                    <span className="num" onClick="">{item.quantity}</span>
                    <span className="plus" onClick={() => toggleCartItemQuanitity(item.name, 'inc') }><AiOutlinePlus /></span>
                  </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                <Link to={''}>
                Pay with PayStack
                </Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
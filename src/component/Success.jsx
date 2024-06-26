import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsBagCheckFill } from "react-icons/bs";

import useStates from "../hooks/useStates";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStates();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  }, []);

  return (
    <>
    <Navbar/>
      <div className="success-wrapper">
        <div className="success">
          <p className="icon">
            <BsBagCheckFill />
          </p>
          <h2>Thank you for your order!</h2>
          <p className="email-msg">Check your email inbox for the receipt.</p>
          <p className="description">
            If you have any questions, please email
            <a className="email" href="mailto:order@example.com">
              store@loudkicks.com
            </a>
          </p>
          <Link to="/">
            <button type="button" width="300px" className="btn">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Success;

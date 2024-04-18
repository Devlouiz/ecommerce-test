import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client, urlFor } from "../lib/client";
import useStates from "../hooks/useStates";
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Navbar from "./Navbar";
import Footer from "./Footer";

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart, resetQty } = useStates();

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  }

  useEffect(() => {
    client
      .fetch(
        `*[slug.current == $slug] {
                name,
                slug,
                price,
                details,
                image[]{
                  asset->{
                    _id,
                    url
                  }
                },
                "imageUrl": image[0].asset->url
            }`,
        { slug }
      )
      .then((data) => {
        setProduct(data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch product details:", err);
        setLoading(false);
      });
  }, [slug]);
  useEffect(()=>{
    resetQty()
  },[])

  if (loading) return <div className="w-full flex align-middle h-full">Loading...</div>;
  if (!product) return <div>Product not found!</div>;
  const addToCart = () => {
    // Assume you have a method to handle adding items to the cart
    onAdd(product, qty);
    resetQty(); // Reset qty after adding to cart
  };

  return (
    <div>
      <Navbar/>
      <div className="product-detail-container">
        <div className="w-full">
          <div className="image-container">
            <img
              src={product.imageUrl}
              //src={urlFor(product.image && product.image[index].asset.url)}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {product.image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item.asset.url)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{product.name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{product.details}</p>
          <p className="price">${product.price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => 
                //onAdd(product, qty)
                addToCart()
              }
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProductDetails;

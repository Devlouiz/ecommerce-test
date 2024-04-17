import heroimg from "../assets/heroimg.png";
import Footer from "./Footer";
import { client } from "../lib/client";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import useStates from "../hooks/useStates";

const Product = ({ product }) => {
  console.log(product);
  const {onAdd} = useStates()

  if (!product) return <div>Oops No Product Available</div>;
  return (
    <div>
      <Link to={`/product/${product.slug.current}`}>
        <div className="product-card">
          <img
            src={product.imageUrl}
            width={250}
            height={200}
            className="product-image"
          />
          <p className="product-name">{product.name}</p>
          <p className="product-price">${product.price}</p>
        </div>
      </Link>
      
    </div>
  );
};

const Hero = () => {
  const [products, setProducts] = useState([]);
  const productContainerRef = useRef(null);
  const scrollToProducts = () => {
    productContainerRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    client
      .fetch(
        `*[_type == "product"]{
            name,
            slug,
            price,
            details,
            "imageUrl": image[0].asset->url
          }`
      )
      .then((data) => {
        setProducts(data);
        console.log("Fetched products:", data);
      })
      .catch(console.error);
  }, []);
  return (
    <>
      <Navbar />
      <section className="bg-gray-800 text-gray-100">
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            <h1 className="text-5xl font-bold leading-none sm:text-6xl">
              LoudKicks
              <span className="text-violet-400"> Premium Sneaker</span>
            </h1>
            <p className="mt-6 mb-8 text-lg sm:mb-12">
              #1 Online store to get all your luxury and premium
              <br className="hidden md:inline lg:hidden" />
              Sneakers at very affordable rates.
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <a
                rel="noopener noreferrer"
                onClick={scrollToProducts}
                className="px-8 py-3 text-lg font-semibold rounded bg-violet-400 text-gray-900 cursor-pointer"
              >
                Shop Now
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <img
              src={heroimg}
              alt=""
              className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            />
          </div>
        </div>
      </section>
      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>sneakers There are many variations passages</p>
      </div>
      <div className="products-container" ref={productContainerRef}>
        {products.length > 0 ? (
          products.map((product) => (
            <Product key={product._id} product={product} />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Hero;

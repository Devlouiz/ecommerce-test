import { Routes, Route } from "react-router-dom";
import Hero from "./component/Hero";
import ProductDetails from "./component/ProductDetails";
import "./App.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
      </Routes>
    </>
  );
};

export default App;

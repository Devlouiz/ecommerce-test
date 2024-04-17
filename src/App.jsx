import { Routes, Route } from "react-router-dom";
import Hero from "./component/Hero";
import ProductDetails from "./component/ProductDetails";
import "./App.css";
import Success from "./component/Success";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/successfulcheckout" element={<Success/>}/>
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </>
  );
};

export default App;

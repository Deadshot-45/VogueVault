import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import Collection from "./Components/Pages/Collection";
import Contact from "./Components/Pages/Contact";
import SignIn from "./Components/Pages/SignIn";
import ProductPage from "./Components/ProductsCard/ProductPage";
import SignUp from "./Components/Pages/SignUp";

const App = () => {
  return (
    <>
      <Router>
        <section className="w-[90%] min-h-[100dvh] flex flex-col items-center mx-auto">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Collection" element={<Collection />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/product" element={<ProductPage />} />
          </Routes>
          <Footer />
        </section>
      </Router>
    </>
  );
};

export default App;
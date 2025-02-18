import React from "react";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Home from "./Components/Pages/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Components/Pages/About";
import Collection from "./Components/Pages/Collection";
import Contact from "./Components/Pages/Contact";

const App = () => {
  return (
    <Router>
      <section className="w-[82%] flex flex-col items-center mx-auto">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Collection" element={<Collection />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
        <Footer />
      </section>
    </Router>
  );
};

export default App;
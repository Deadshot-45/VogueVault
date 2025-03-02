import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

const App = ({ children }) => {
  return (
    <>
      <section className="w-[90%] min-h-[100dvh] flex flex-col items-center mx-auto">
        <NavBar />
        {children}
        <Footer />
      </section>
    </>
  );
};

export default App;

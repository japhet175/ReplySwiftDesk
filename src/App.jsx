import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./assets/components/Navbar";
import Footer from "./assets/components/Footer";
import Home from "./assets/pages/Home";
import About from "./assets/pages/About";
import Services from "./assets/pages/Services";
import Contact from "./assets/pages/Contact";
import Portfolio from "./assets/pages/Portfolio";
import Careers from "./assets/pages/Careers";

function App() {
  useEffect(() => {
    // ------- Tawk.to live chat script -------
    if (!window.Tawk_API) {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://embed.tawk.to/692a3a78b154901962a5263c/1jb6f8q4k";
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");

      document.body.appendChild(script);

      // Nettoyer le script quand le composant se démonte
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

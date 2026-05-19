/* Client/src/pages/Home.jsx */
import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}

export default Home;

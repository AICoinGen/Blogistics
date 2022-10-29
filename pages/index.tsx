import React from "react";
import Header from "../components/partials/Header";
import HeroHome from "../components/partials/HeroHome";
import FeaturesHome from "../components/partials/Features";
import FeaturesBlocks from "../components/partials/FeaturesBlocks";
import Testimonials from "../components/partials/Testimonials";
import Newsletter from "../components/partials/Newsletter";
import Footer from "../components/partials/Footer";

function Index() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden font-Montserrat bg-gray-900">
      {/*  Site header */}
      <Header />

      {/* <main className="flex-grow">
        <HeroHome />
        <FeaturesBlocks />
        <FeaturesHome />
        <Testimonials />
        <Newsletter />
      </main> */}

      {/* <Footer /> */}
    </div>
  );
}

export default Index;

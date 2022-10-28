import React from "react";

import Header from "../components/partials/Header";
import AboutPage from "../components/partials/About";


import Footer from "../components/partials/Footer";

function About() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden font-Montserrat">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        {/*  Page sections */}
        <AboutPage />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default About;

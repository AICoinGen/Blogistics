import React from "react";

import Header from "../components/partials/Header";
import PolicyPage from "../components/partials/Policy";

import Footer from "../components/partials/Footer";

function Policy() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden font-Montserrat">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        {/*  Page sections */}
        <PolicyPage />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default Policy;

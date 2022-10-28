import React from "react";

import Header from "../components/partials/Header";
import TermsPage from "../components/partials/Terms";

import Footer from "../components/partials/Footer";

function Terms() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden font-Montserrat">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        {/*  Page sections */}
        <TermsPage />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default Terms;

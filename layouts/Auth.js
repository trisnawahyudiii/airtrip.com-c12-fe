import React from "react";

// components

import Navbar from "../components/Navbar/AuthNavbar";
import FooterSmall from "../components/Footers/FooterSmall.js";

export default function Auth({ children }) {
  return (
    <>
      <Navbar transparent />
      <main>
        <section
          className="relative w-full h-full min-h-screen"
          style={{ paddingTop: "10rem", paddingBottom: "10rem" }}
        >
          <div
            className="absolute top-0 w-full h-full bg-no-repeat "
            style={{
              backgroundImage: "url('/img/4.jpg')",
            }}
          ></div>
          {children}
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}

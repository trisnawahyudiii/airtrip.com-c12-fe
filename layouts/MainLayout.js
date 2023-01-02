import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";

import Footer from "../components/Footers/Footer";

const MainLayout = ({ children, user }) => {
  return (
    <div>
      <Navbar userData={user} transparent />

      <main
        style={{
          backgroundImage: `url('/img/4.jpg')`,
        }}
        className="h-max"
      >
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;

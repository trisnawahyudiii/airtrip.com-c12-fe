import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";

import Footer from "../components/Footers/Footer";

const MainLayout = ({ children, user }) => {
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Airtrip</title>
      </Head>
      <Navbar userData={user} transparent />

      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;

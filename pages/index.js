// dependencies
import Link from "next/link";
import Head from "next/head";

// components
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import CariTiketForm from "../components/CariTiketForm/CariTiketForm";
import OurServices from "../components/OurServices/OurServices";
import Package from "../components/Package/Package";
import Footer from "../components/Footers/Footer";

// other

const Home = () => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Airtrip</title>
      </Head>
      <main>
        <Navbar transparent />
        <div className="relative">
          <Hero />
          <div className="absolute top-[75%] w-full">
            <CariTiketForm />
          </div>
        </div>
        <OurServices />
        <Package />
        <Footer />
      </main>
    </>
  );
};

export default Home;

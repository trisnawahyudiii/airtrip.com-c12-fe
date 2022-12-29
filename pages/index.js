// dependencies
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { verify } from "jsonwebtoken";

// components
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import CariTiketForm from "../components/CariTiketForm/CariTiketForm";
import OurServices from "../components/OurServices/OurServices";
import Package from "../components/Package/Package";
import Footer from "../components/Footers/Footer";

// layout
import MainLayout from "../layouts/MainLayout";

const Home = () => {
  return (
    <>
      <MainLayout>
        <div className="relative">
          <Hero />
          <div className="absolute top-[75%] w-full">
            <CariTiketForm />
          </div>
        </div>
        <OurServices />
        <Package />
      </MainLayout>
    </>
  );
};

export default Home;

// dependencies
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { verify } from "jsonwebtoken";

// components
import Hero from "../components/Hero/Hero";
import CariTiketForm from "../components/CariTiketForm/CariTiketForm";
import OurServices from "../components/OurServices/OurServices";
import Package from "../components/Package/Package";

// layout
import MainLayout from "../layouts/MainLayout";

const Home = ({ userData }) => {
  return (
    <>
      <MainLayout user={userData}>
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

export async function getServerSideProps({ req, res }) {
  const { accessToken } = req.cookies;

  const config = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await fetch(process.env.API_URL + "/auth/whoami", config);
  const { data } = await response.json();

  if (data) {
    return {
      props: { userData: data.data },
    };
  } else {
    return {
      props: { userData: null },
    };
  }
}

export default Home;

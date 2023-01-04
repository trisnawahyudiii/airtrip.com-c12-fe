import React, { useEffect, useRef, useState } from "react";
import PageComponentTitle from "./PageComponentTitle";
import AirplaneTable from "./AirplaneTable";
import axios from "axios";
import { Loading } from "../common/Loading";
import Cookies from "js-cookie";

const Airplane = () => {
  const [airplanes, setAirplanes] = useState(null);

  async function fetchAirplanes() {
    try {
      const data = await axios.get(
        "https://airtrip-be-production.up.railway.app/airplanes",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      setAirplanes(data.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchAirplanes();
  }, []);

  if (!airplanes) return <Loading />;
  return (
    <main className="p-6 sm:p-10 space-y-6">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <PageComponentTitle
          title="Airplane"
          fetchAirplanes={fetchAirplanes}
          // titleDescription='List, view and edit'
          buttonTitle="Create new airplane"
        />
      </div>

      <section className="grid md:grid-cols-1 xl:grid-cols-1 gap-6">
        <div className="flex-grow items-center p-8 bg-white shadow rounded-lg">
          <AirplaneTable datas={airplanes} fetchAirplanes={fetchAirplanes} />
        </div>
      </section>
    </main>
  );
};

export default Airplane;

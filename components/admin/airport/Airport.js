import React, { useEffect, useState } from "react";
import PageComponentTitle from "./PageComponentTitle";
import AirportTable from "./AirportTable";
import axios from "axios";
import { Loading } from "../common/Loading";

const Airport = () => {
  const [airports, setAirports] = useState(null);
  function fetchAirports() {
    axios
      .get("https://airtrip-be-production.up.railway.app/airports")
      .then((response) => {
        setAirports(response.data.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }
  useEffect(() => {
    fetchAirports();
  }, []);
  if (!airports) return <Loading />;
  return (
    <main className="p-6 sm:p-10 space-y-6">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <PageComponentTitle
          title="Airport"
          // titleDescription='List, view and edit'
          buttonTitle="Create new airport"
        />
      </div>

      <section className="grid md:grid-cols-1 xl:grid-cols-1 gap-6">
        <div className="flex-grow items-center p-8 bg-white shadow rounded-lg">
          <AirportTable data={airports} />
        </div>
      </section>
    </main>
  );
};

export default Airport;

import React, { useEffect, useRef, useState } from "react";
import PageComponentTitle from "./PageComponentTitle";
import FlightTable from "./FlightTable";
import axios from "axios";
import { Loading } from "../common/Loading";
import Cookies from "js-cookie";

function parseFlights(flights) {
  const rows = flights.map((flight) => {
    return {
      id: flight.id,
      price: flight.price,
      airplane: {
        id: flight.airplane.id,
        name: flight.airplane.manufacture + " " + flight.airplane.model_number,
      },
      from: { id: flight.from_airport.id, name: flight.from_airport.name },
      to: { id: flight.to_airport.id, name: flight.to_airport.name },
      departure: flight.departure,
      arrival: flight.arrival,
      flight_class: flight.flight_class,
      description: flight.description,
    };
  });

  // const headers = Object.keys(rows[0]);

  return rows;
}

const Flight = () => {
  const flightsData = useRef(null);
  const [flights, setFlights] = useState(null);
  const [airports, setAirports] = useState(null);
  const [airplanes, setAirplanes] = useState(null);

  async function fetchFlights() {
    try {
      const data = await axios.get(
        `https://airtrip-be-production.up.railway.app/flights`
      );
      flightsData.current = data.data.data;

      setFlights(parseFlights(flightsData.current));
    } catch (error) {
      console.log(error);
    }
  }
  function fetchAirports() {
    axios
      .get("https://airtrip-be-production.up.railway.app/airports")
      .then((response) => {
        const data = response.data.data.map((airport) => {
          return { name: airport.name, id: airport.id };
        });

        setAirports(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function fetchAirplanes() {
    axios
      .get("https://airtrip-be-production.up.railway.app/airplanes", {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      })
      .then((response) => {
        const data = response.data.data.map((airplane) => {
          return {
            name: `${airplane.manufacture} ${airplane.model_number}`,
            id: airplane.id,
          };
        });

        setAirplanes(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    fetchFlights();
    fetchAirports();
    fetchAirplanes();
  }, []);

  if (!flights) return <Loading />;
  return (
    <main className="p-6 sm:p-10 space-y-6">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <PageComponentTitle
          title="Flight"
          fetchFlights={fetchFlights}
          airports={airports}
          airplanes={airplanes}
          // titleDescription='List, view and edit'
          buttonTitle="Create new flight"
        />
      </div>

      <section className="grid md:grid-cols-1 xl:grid-cols-1 gap-6">
        <div className="flex-grow items-center bg-white shadow rounded-lg">
          <FlightTable
            datas={flights}
            fetchFlights={fetchFlights}
            airports={airports}
            airplanes={airplanes}
          />
        </div>
      </section>
    </main>
  );
};

export default Flight;

/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import React, { useEffect, useState } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";

import cookie from 'js-cookie'

const Modal = ({
  modal,
  setModal,
  data,
  setData,
  fetchFlights,
  airports,
  airplanes,
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    // check if data empty
    for (const key in data) {
      if (!data[key]) {
        alert("please fill out the form!");
        return;
      }
    }

    if (new Date(data.departure) > new Date(data.arrival)) {
      alert("Tanggal tiba dan keberangkatan tidak valid");
    }

    axios({
      url:
        "https://airtrip-be-production.up.railway.app" +
        (data.id ? `/flights/update/${data.id}` : "/flights/create"),
      method: data.id ? "PUT" : "POST",
      data: {
        ...data,
        departure: new Date(data.departure).toISOString(),
        arrival: new Date(data.arrival).toISOString(),
      },
      headers: {
        Authorization: `Bearer ${cookie.get("accessToken")}`,
      },
    })
      .then((response) => {
        fetchFlights();
        setModal(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  if (!airports || !airplanes) return null;
  return (
    <>
      <PureModal
        isOpen={modal}
        width="800px"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <form className="flex-row space-y-3 relative" onSubmit={handleSubmit}>
          <div className="bg-blue-300 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4">
            <p>Flight</p>
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="departure" className="font-semibold pr-2">
              Departure
            </label>
            <input
              className="border-2 border-blue-300/50 w-[75%] "
              onChange={handleChange}
              type="datetime-local"
              name="departure"
              value={data.departure}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold pr-2" htmlFor="arrival">
              Arrival
            </label>
            <input
              className="border-2 border-blue-300/50 w-[75%] "
              type="datetime-local"
              name="arrival"
              onChange={handleChange}
              value={data.arrival}
            />
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="flight_class" className="font-semibold pr-2">
              Flight Class
            </label>

            <select
              className="border-2 border-blue-300/50 w-[75%] "
              type="text"
              name="flight_class"
              onChange={handleChange}
              value={data.flight_class}
            >
              <option value="" disabled>
                Choose Class
              </option>
              <option value="first">First Class</option>
              <option value="bussiness">Business</option>
              <option value="economy">Economy</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold pr-2" htmlFor="price">
              Price
            </label>
            <input
              className="border-2 border-blue-300/50 w-[75%] "
              type="number"
              name="price"
              onChange={handleChange}
              value={data.price}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold pr-2" htmlFor="from">
              From
            </label>
            <select
              className="border-2 border-blue-300/50 w-[75%] "
              type="text"
              name="from"
              onChange={handleChange}
              value={data.from}
            >
              <option value={""} disabled>
                Select airport
              </option>
              {airports.map((airport, index) => {
                return (
                  <option key={index} value={airport.id}>
                    {airport.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex justify-between items-center">
            <label className="font-semibold pr-2" htmlFor="to">
              To
            </label>
            <select
              className="border-2 border-blue-300/50 w-[75%] "
              type="text"
              name="to"
              onChange={handleChange}
              value={data.to}
            >
              <option value={""} disabled>
                Select airport
              </option>
              {airports.map((airport, index) => {
                return (
                  <option key={index} value={airport.id}>
                    {airport.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex justify-between items-center">
            <label className="font-semibold pr-2" htmlFor="airplane_id">
              Airplane
            </label>
            <select
              className="border-2 border-blue-300/50 w-[75%] "
              type="text"
              name="airplane_id"
              onChange={handleChange}
              value={data.airplane_id}
            >
              <option value={""} disabled>
                Select airplane
              </option>
              {airplanes.map((airplane, index) => {
                return (
                  <option key={index} value={airplane.id}>
                    {airplane.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold pr-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="border-2 border-blue-300/50 w-[75%] "
              name="description"
              onChange={handleChange}
              value={data.description}
            ></textarea>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-300 text-white p-3 w-full mt-5 text-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </PureModal>
    </>
  );
};

export default Modal;

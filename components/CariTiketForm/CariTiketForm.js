// dependencies
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Router from "next/router";

import Swal from "sweetalert2";

import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";


import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";

// datepicker

import DateFnsUtils from "@date-io/date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers";

const CariTiketForm = (props) => {
  const [airports, setAirports] = useState([]);

  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [flightType, setFlightType] = useState("Oneway");
  const [flightClass, setFlightClass] = useState("economy");
  const [departureDate, setDepartureDate] = useState(null);
  const [returningDate, setReturningDate] = useState(null);

  // airport data fetching
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      axios({
        method: "get",
        url: "https://airtrip-be-production.up.railway.app/airports",
      })
        .then((json) => {
          const data = json.data.data;
          setAirports(data);
          return;
        })
        .catch((error) => console.error);
    };

    fetchData();
  }, []);

  const airport_options = airports.map((airport) => {
    return {
      id: airport.id,
      name: airport.name,
    };
  });

  const validateOneWay = (from, to, departureDate) => {
    // console.log(from, to, departureDate);
    // console.log("index from", airport_options.indexOf(from));
    const validFrom =
      airport_options.findIndex((object) => {
        return object.id === from.id;
      }) > -1;
    const validTo =
      airport_options.findIndex((object) => {
        return object.id === to.id;
      }) > -1;
    const validDate = departureDate > new Date();

    if (validFrom && validTo && validDate) {
      return true;
    } else {
      let errorText = "";

      if (!validDate) {
        errorText += "Departure date";
        errorText += departureDate ? " are invalid! \n" : " are required!";
      }

      if (!validFrom) {
        if (errorText.length > 0) errorText += ", ";
        errorText += "Departure airport";
      }

      if (!validTo) {
        if (errorText.length > 0) errorText += ", ";
        errorText += "Arrival airport";
      }

      errorText += validFrom && validTo ? "" : " are required!";

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorText,
      });

      return false;
    }
  };

  const validateRoundtrip = (from, to, departureDate, returningDate) => {
    const validFrom =
      airport_options.findIndex((object) => {
        return object.id === from.id;
      }) > -1;
    const validTo =
      airport_options.findIndex((object) => {
        return object.id === to.id;
      }) > -1;
    const validDeparture = departureDate > new Date();
    const validReturning = returningDate > new Date();
    const validDate =
      returningDate > departureDate && returningDate !== departureDate;

    if (validFrom && validTo && validDeparture && validDate) {
      return true;
    } else {
      let errorText = "";

      if (!validDeparture) {
        errorText += "Departure date";
      }

      if (!validReturning) {
        if (errorText.length > 0) errorText += ", ";
        errorText += "Returning date";
      }

      if (!validDeparture || !validReturning) {
        errorText +=
          departureDate || returningDate
            ? " are invalid! \n"
            : " are required!";
      }

      if (!validDate) {
        if (errorText.length > 0) errorText += ", ";
        errorText +=
          "Departure date should be sooner and should not be same as Returning date";
      }

      if (!validFrom) {
        if (errorText.length > 0) errorText += ", ";
        errorText += "Departure airport";
      }

      if (!validTo) {
        if (errorText.length > 0) errorText += ", ";
        errorText += "Arrival airport";
      }

      errorText += "are required!";

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorText,
      });
      return false;
    }
  };

  const handleSubmit = () => {
    const validated =
      flightType === "Oneway"
        ? validateOneWay(from, to, departureDate)
        : validateRoundtrip(from, to, departureDate, returningDate);

    if (validated) {
      Router.push(
        `/flights/search?&flightType=${flightType}&flightClass=${flightClass}&from=${
          from.id
        }&to=${to.id}&departureDate=${String(departureDate)}` +
          (flightType === "Roundtrip"
            ? `&returningDate=${String(returningDate)}`
            : "")
      );
    }
  };

  return (
    <div className="flex items-center justify-center w-full mx-auto">
      {/* ini dibagi 2, kiri untuk pilihan penerbangan, kanan untuk input field */}
      <div className="flex bg-white md:w-[70%] md:h-[70%] rounded-lg z-100 shadow-lg mt-10 p-0">
        {/* pilihan tipe penerbangan */}
        <div className="flex flex-col w-20 text-center text-white font-normal text-sm bg-gray-600 rounded-l-lg overflow-hidden">
          <button
            className={
              "flex flex-col justify-center items-center hover:cursor-pointer hover:bg-gray-700 p-2 my-auto h-full ease-in-out duration-500 " +
              (flightType === "Oneway" ? "bg-gray-900" : "text-slate-400")
            }
            onClick={() => setFlightType("Oneway")}
          >
            <LocalAirportIcon className="mb-1" />
            One Way
          </button>
          <Divider light />
          <button
            className={
              "flex flex-col items-center justify-center hover:cursor-pointer hover:bg-gray-700 p-2 my-auto h-full ease-in-out duration-500 " +
              (flightType !== "Oneway" ? "bg-gray-900" : "text-slate-400")
            }
            onClick={() => setFlightType("Roundtrip")}
          >
            <ConnectingAirportsIcon
              className="mb-1 rotate-90"
              fontSize="large"
            />
            Round Trip
          </button>
        </div>

        {/* input fields */}
        <div className="p-8 w-full">
          <div className="flex justify-between">
            <span className="text-2xl font-semibold">Find your Schedule</span>
          </div>
          <div className="flex justify-between pt-5">
            {/* asal */}
            <div className="w-[30%]">
              <Autocomplete
                loading
                fullWidth
                disablePortal
                id="from-flight-select"
                options={airport_options.filter((item) => item.id != to?.id)}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) =>
                  value === undefined || value === "" || option.id === value.id
                }
                renderOption={(props, option) => (
                  <Box component="li" {...props} key={option.id}>
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => <TextField {...params} label="From" />}
                value={from}
                onChange={(event, newValue) => setFrom(newValue)}
              />
            </div>

            {/* tujuan */}
            <div className="w-[30%]">
              <Autocomplete
                fullWidth
                disablePortal
                id="to-flight-select"
                options={airport_options.filter((item) => item.id != from?.id)}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) =>
                  value === undefined || value === "" || option.id === value.id
                }
                renderOption={(props, option) => (
                  <Box component="li" {...props} key={option.id}>
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => <TextField {...params} label="To" />}
                value={to}
                onChange={(event, newValue) => setTo(newValue)}
              />
            </div>

            {/* flight class */}
            <div className="w-[30%]">
              <FormControl className="w-[30%] z-0">
                <InputLabel id="flight-class-label">Flight Class</InputLabel>
                <Select
                  labelId="flight-class-label"
                  id="flight-class-select"
                  value={flightClass}
                  label="Flight Class"
                  onChange={(e) => setFlightClass(e.target.value)}
                >
                  <MenuItem value="economy">Economy</MenuItem>
                  <MenuItem value="bussiness">Bussiness</MenuItem>
                  <MenuItem value="first">First</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          {/** jika pilhan roundtrip maka muncul tanggal kepulangan */}
          <LocalizationProvider dateAdapter={DateFnsUtils}>
            <div className="pt-5 flex justify-between z-0 ">
              <div className="w-[65%] flex justify-between">
                {/* tanggal keberangkatan */}
                <div
                  className={
                    "ease-in-out duration-200 delay-75 " +
                    (flightType === "Oneway" ? "w-full" : "w-[46%] ")
                  }
                >
                  <DesktopDatePicker
                    label="Departure"
                    fullWidth
                    value={departureDate}
                    onChange={(date) => setDepartureDate(date)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>

                {/* tanggal pulang (for round trip) */}
                {flightType === "Roundtrip" && (
                  <div className=" w-[46%]">
                    <DesktopDatePicker
                      label="Return"
                      value={returningDate}
                      onChange={(date) => setReturningDate(date)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </div>
                )}
              </div>

              {/* button cari penerbangan */}
              <button
                className="px-2 py-4 bg-gray-600 hover:cursor-pointer hover:bg-gray-900 text-white rounded-md w-[30%] z-0 ease-in-out duration-300"
                onClick={handleSubmit}
              >
                Cari Penerbangan
              </button>
            </div>
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
};

export default CariTiketForm;

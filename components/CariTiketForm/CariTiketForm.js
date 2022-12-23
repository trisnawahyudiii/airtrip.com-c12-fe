// dependencies
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

// datepicker

import DateFnsUtils from "@date-io/date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers";

const CariTiketForm = (props) => {
  const [airports, setAirports] = useState([]);

  const [flightType, setFlightType] = useState("Oneway");
  const [flightClass, setFlightClass] = useState("economy");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
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

  return (
    <div className="flex items-center justify-center w-full mx-auto">
      {/* ini dibagi 2, kiri untuk pilihan penerbangan, kanan untuk input field */}
      <div className="flex bg-white md:w-[70%] md:h-[70%] rounded-lg z-100 shadow-lg mt-10 p-0">
        {/* pilihan tipe penerbangan */}
        <div className="flex flex-col w-20 text-center text-white bg-gray-600 rounded-l-lg overflow-hidden">
          <span
            className={
              "flex items-center hover:cursor-pointer hover:bg-gray-700 p-2 my-auto h-full " +
              (flightType === "Oneway" ? "bg-gray-900" : "")
            }
            onClick={() => setFlightType("Oneway")}
          >
            One Way
          </span>
          <Divider light />
          <span
            className={
              "flex items-center hover:cursor-pointer hover:bg-gray-700 p-2 my-auto h-full " +
              (flightType !== "Oneway" ? "bg-gray-900" : "")
            }
            onClick={() => setFlightType("Roundtrip")}
          >
            Round Trip
          </span>
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
                options={airport_options}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) =>
                  value === undefined || value === "" || option.id === value.id
                }
                renderOption={(props, option) => (
                  <Box component="li" {...props} key={option.id}>
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => <TextField {...params} label="Dari" />}
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
                options={airport_options}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) =>
                  value === undefined || value === "" || option.id === value.id
                }
                renderOption={(props, option) => (
                  <Box component="li" {...props} key={option.id}>
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => <TextField {...params} label="Ke" />}
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
              {/* tanggal keberangkatan */}
              <div
                className={
                  "ease-in-out duration-200 delay-75 " +
                  (flightType === "Oneway" ? "w-[65%]" : "w-[30%] ")
                }
              >
                <DesktopDatePicker
                  label="Pergi"
                  fullWidth
                  value={departureDate}
                  onChange={(date) => setDepartureDate(date)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>

              {/* tanggal pulang (for round trip) */}
              {flightType === "Roundtrip" && (
                <div className=" w-[30%]">
                  <DesktopDatePicker
                    label="Pulang"
                    value={returningDate}
                    onChange={(date) => setReturningDate(date)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              )}

              {/* button cari penerbangan */}
              <button className="px-2 py-4 bg-gray-600 hover:cursor-pointer hover:bg-gray-900 text-white rounded-md w-[30%] z-0">
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

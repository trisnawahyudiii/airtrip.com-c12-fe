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

const CariTiketForm = (props) => {
  const [airports, setAirports] = useState([]);
  const [flightClass, setFlightClass] = useState("economy");

  const [from, setFrom] = useState("");

  const [to, setTo] = useState(2);
  const [toFocus, setToFocus] = useState(false);

  // airport data fetching
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      axios({
        method: "get",
        url: "https://airtripcom-c12-be-production.up.railway.app/airports",
      }).then((json) => {
        const data = json.data.data;
        setAirports(data);
        return;
      });
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
      <div className="flex bg-white md:w-[70%] md:h-[70%] rounded-lg z-100 shadow-lg mt-10 p-0 overflow-hidden">
        {/* pilihan tipe penerbangan */}
        <div className="flex flex-col w-20 text-center text-white bg-slate-600">
          <span className="p-2 my-auto">One Way</span>
          <Divider light />
          <span className="p-2 my-auto">Round Trip</span>
        </div>

        {/* input fields */}
        <div className="p-8 w-full relative">
          <div className="flex justify-between ">
            {/* asal */}
            <div className="w-[30%]">
              <Autocomplete
                fullWidth
                disablePortal
                className="width-[30%]"
                id="from-flight-select"
                getOptionLabel={(option) => option.name}
                options={airport_options}
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
                className="width-[30%]"
                id="to-flight-select"
                getOptionLabel={(option) => option.name}
                options={airport_options}
                renderOption={(props, option) => (
                  <Box component="li" {...props} key={option.id}>
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => <TextField {...params} label="Ke" />}
              />
            </div>

            {/* flight class */}
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

          <div className="pt-5 flex justify-between z-0">
            {/** jika pilhan roundtrip maka muncul tanggal kepulangan */}
            {/* tanggal keberangkatan */}
            <FormControl className="w-[30%]">
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

            {/* tanggal pulang (for round trip) */}
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

            {/* button cari penerbangan */}
            <button className="px-2 py-4 bg-slate-900 text-white rounded-md w-[30%] z-0">
              Cari Penerbangan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CariTiketForm;

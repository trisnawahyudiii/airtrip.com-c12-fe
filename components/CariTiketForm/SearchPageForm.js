// dependencies
import axios from "axios";
import { useState, useEffect } from "react";

// components
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

const SearchPageForm = ({ props }) => {
  const [airports, setAirports] = useState([]);

  const [to, setTo] = useState(null);
  const [from, setFrom] = useState(null);
  const [flightType, setFlightType] = useState(props.flightType);
  const [flightClass, setFlightClass] = useState(props.flightClass);
  const [departureDate, setDepartureDate] = useState(props.departureDate);
  const [returningDate, setReturningDate] = useState(props.departureDate || null);

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

  // set initial from and to
  useEffect(() => {
    const initialTo = airport_options.find((item) => item.id == String(props.to));
    const initialFrom = airport_options.find((item) => item.id == String(props.from));

    setFrom(initialFrom);
    setTo(initialTo);
    // console.log("initial airports");
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    props.setTo(to.id);
    props.setFrom(from.id);
    props.setDepartureDate(departureDate);
    props.setFlightType(flightType);
    props.setFlightClass(flightClass);

    props.setNewSearch(true);

    if (flightType === "Roundtrip") props.setReturningDate(returningDate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-center w-full mx-auto">
        {/* ini dibagi 2, kiri untuk pilihan penerbangan, kanan untuk input field */}
        <div className="flex bg-white md:w-full rounded-lg z-100 shadow-lg p-0">
          {/* pilihan tipe penerbangan */}
          <div className="flex flex-col w-20 text-center text-white font-normal text-sm bg-gray-600 rounded-l-lg overflow-hidden">
            <div
              className={
                "flex flex-col justify-center items-center hover:cursor-pointer hover:bg-gray-700 p-2 my-auto h-full ease-in-out duration-500 " +
                (flightType === "Oneway" ? "bg-gray-900" : "text-slate-400")
              }
              onClick={() => {
                props.handleReset();
                setFlightType("Oneway");
              }}
            >
              <LocalAirportIcon className="mb-1" />
              One Way
            </div>
            <Divider light />
            <div
              className={
                "flex flex-col items-center justify-center hover:cursor-pointer hover:bg-gray-700 p-2 my-auto h-full ease-in-out duration-500 " +
                (flightType !== "Oneway" ? "bg-gray-900" : "text-slate-400")
              }
              onClick={() => {
                props.handleReset();
                setFlightType("Roundtrip");
              }}
            >
              <ConnectingAirportsIcon className="mb-1 rotate-90" fontSize="large" />
              Round Trip
            </div>
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
                  value={from || ""}
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
                  value={to || ""}
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
                  type="submit"
                  className="px-2 py-4 text-sm font-normal bg-gray-600 hover:cursor-pointer hover:bg-gray-900 text-white rounded-md w-[30%] z-0 ease-in-out duration-300"
                >
                  Search Flight
                </button>
              </div>
            </LocalizationProvider>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchPageForm;

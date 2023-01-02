// dependencies
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

// components
import MainLayout from "../../layouts/MainLayout";
import FlightCard from "../../components/Cards/FlightCard";
import CartItem from "../../components/Cards/CartItem";
import BoardingPass from "../../components/Cards/BoardingPass";
import SearchPageForm from "../../components/CariTiketForm/SearchPageForm";
import { CircularProgress } from "@mui/material";

// stepper
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Search = ({ user }) => {
  const router = useRouter();
  const reqQuery = { ...router.query };

  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // const [flights, setFlights] = useState([]);
  const [departureFlight, setDepartureFlight] = useState([]);
  const [returningFlight, setReturningFlight] = useState([]);
  const [selectedDepartureFlight, setSelectedDepartureFlight] = useState(null);
  const [selectedReturningFlight, setSelectedReturningFlight] = useState(null);

  const [newSearch, setNewSearch] = useState(true);
  const [ticket, setTicket] = useState(null);

  const [to, setTo] = useState(reqQuery.to);
  const [from, setFrom] = useState(reqQuery.from);
  const [flightType, setFlightType] = useState(reqQuery.flightType);
  const [flightClass, setFlightClass] = useState(reqQuery.flightClass);
  const [departureDate, setDepartureDate] = useState(reqQuery.departureDate);
  const [returningDate, setReturningDate] = useState(reqQuery.departureDate || null);

  // initial search data
  useEffect(() => {
    setIsLoading(true);

    // departure flight
    axios
      .get(
        `https://airtrip-be-production.up.railway.app/flights/search?&flightType=${reqQuery.flightType}&flightClass=${reqQuery.flightClass}&from=${reqQuery.from}&to=${reqQuery.to}&departureDate=${reqQuery.departureDate}`
      )
      .then((response) => {
        setIsLoading(false);
        // console.log("search success!", response.data.data);
        setDepartureFlight(response.data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("error!", err);
        setIsError(err);
      });

    // returning flight
    if (flightType === "Roundtrip") {
      axios
        .get(
          `https://airtrip-be-production.up.railway.app/flights/search-return?&flightType=${reqQuery.flightType}&flightClass=${reqQuery.flightClass}&from=${reqQuery.from}&to=${reqQuery.to}&returnFlightDate=${reqQuery.returningDate}&arrivalDate=${reqQuery.departureDate}`
        )
        .then((response) => {
          setIsLoading(false);
          // console.log("search success!", response.data.data);
          setReturningFlight(response.data.data);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log("error!", err);
          setIsError(err);
        });
    }

    setNewSearch(false);
  }, []);

  // new search
  useEffect(() => {
    // console.log("search page submit!");
    setIsLoading(true);

    // departure flight
    axios
      .get(
        `https://airtrip-be-production.up.railway.app/flights/search?&flightType=${flightType}&flightClass=${flightClass}&from=${from}&to=${to}&departureDate=${departureDate}`
      )
      .then((response) => {
        setIsLoading(false);
        // console.log("search success!", response.data.data);
        setDepartureFlight(response.data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("error!", err);
        setIsError(err);
      });

    // returning flight
    if (flightType === "Roundtrip") {
      axios
        .get(
          `https://airtrip-be-production.up.railway.app/flights/search-return?&flightType=${flightType}&flightClass=${flightClass}&from=${from}&to=${to}&returnFlightDate=${returningDate}&arrivalDate=${departureDate}`
        )
        .then((response) => {
          setIsLoading(false);
          console.log("returning search success!", response.data.data);
          setReturningFlight(response.data.data);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log("error!", err);
          setIsError(err);
        });
    }

    setNewSearch(false);
  }, [newSearch]);

  /**---------------------------
   *        STEPPPER
  ---------------------------**/
  // steps name
  const OnewaySteps = ["Search Flights", "Pick a flight", "Review your purchase"];
  const RoundtripSteps = [
    "Search Flights",
    "Select departure flight",
    "Select returning flight",
    "Review your purchase",
  ];

  // states
  const [activeStep, setActiveStep] = React.useState(1);
  const [steps, setSteps] = useState(OnewaySteps);

  useEffect(() => {
    if (flightType === "Oneway") {
      setSteps(OnewaySteps);
    } else {
      setSteps(RoundtripSteps);
    }
  }, [flightType]);

  // handler
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // flight card selection handler
  const handleSelectFlight = (props) => (value) => {
    if (user) {
      if (props === "departure") {
        // console.log("departure fligt:");
        setSelectedDepartureFlight(value);
      } else {
        // console.log("returning fligt:");
        setSelectedReturningFlight(value);
      }
      // console.log(value);
    } else {
      //login notification
      Swal.fire({
        title: "You are not logged in!",
        text: "Please login before making any purcases!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4b5563",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          Router.push("/users/login");
        }
      });
    }
  };

  let formatIDR = new Intl.NumberFormat("ID", {
    style: "currency",
    currency: "IDR",
  });

  const handleReset = () => {
    setActiveStep(1);
    setSelectedDepartureFlight(null);
    setSelectedReturningFlight(null);
  };

  const searchPageProps = {
    from,
    setFrom,
    to,
    setTo,
    flightType,
    setFlightType,
    flightClass,
    setFlightClass,
    departureDate,
    setDepartureDate,
    returningDate,
    setReturningDate,
    newSearch,
    setNewSearch,
    handleReset,
  };

  // checkout handler
  const handleCheckout = () => {
    console.log("checkout");
    setIsLoading(true);
    const token = cookie.get("accessToken");

    const reqBody = {
      flightId1: selectedDepartureFlight.id,
      flightId2: selectedReturningFlight?.id || null,
      flightType: flightType,
    };

    axios
      .post("https://airtrip-be-production.up.railway.app/tickets/create", reqBody, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setIsLoading(false);
        console.log(response);
        return;
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        setIsError(err);
        return;
      });
  };

  return (
    <MainLayout user={user}>
      <div className="mt-[60px] py-10 px-36 text-3xl font-bold z-10 ">
        {/* search bar will dissapear when a ticket successfully purchased */}
        {!ticket && <SearchPageForm props={searchPageProps} />}

        {ticket && (
          <div>
            <BoardingPass ticket={ticket} />
          </div>
        )}

        {isLoading && (
          // ini component untuk tidak ada data
          <div className="flex flex-col h-[30vh] w-full items-center justify-center">
            <CircularProgress />
            <p className="text-sm font-bold py-3">Fetching data, please be patient!</p>
          </div>
        )}

        {/* ini component flightCard saat data flight sudah di fetch */}
        {!ticket && !isLoading && (departureFlight.length !== 0 || returningFlight.length !== 0) ? (
          <div>
            {/* stepper */}
            <div className="flex flex-col p-8 w-full my-8 items-center bg-white rounded-lg shadow-lg">
              <Box sx={{ width: "100%" }}>
                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button>Reset</Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {/* step 1, select departure flight */}
                    <div className="py-8">
                      {activeStep === 1 && (
                        <div className="flex flex-col items-center w-full">
                          <div className="flex justify-between items-center w-full">
                            <span className="text-2xl font-semibold">Select Your Flight</span>
                            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                              <Button
                                disabled={activeStep === 1}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                                className="px-4 py-2 rounded-md bg-none border border-slate-500 text-gray-500 hover:bg-gray-200 ease-in-out duration-500 disabled:bg-gray-200 font-semibold"
                              >
                                Back
                              </Button>
                              <Box sx={{ flex: "1 1 auto" }} />

                              <Button
                                onClick={handleNext}
                                className="px-6 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-900 ease-in-out duration-500 disabled:bg-gray-200"
                                disabled={!selectedDepartureFlight}
                              >
                                Next
                              </Button>
                            </Box>
                          </div>

                          {/* flightCards */}
                          {departureFlight.map((flight) => (
                            <FlightCard
                              key={flight.id}
                              flight={flight}
                              selectedFlight={selectedDepartureFlight}
                              handleSelectFlight={handleSelectFlight("departure")}
                            />
                          ))}
                        </div>
                      )}

                      {/* step 2, select returning flight */}
                      {flightType === "Roundtrip" && activeStep === 2 && (
                        <div className="flex flex-col items-center ">
                          <div className="flex justify-between items-center w-full">
                            <span className="text-2xl font-semibold">Select Your Flight</span>
                            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                              <Button
                                disabled={activeStep === 1}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                                className="px-4 py-2 rounded-md bg-none border border-slate-500 text-gray-500 hover:bg-gray-200 ease-in-out duration-500 disabled:bg-gray-200 font-semibold"
                              >
                                Back
                              </Button>
                              <Box sx={{ flex: "1 1 auto" }} />

                              <Button
                                onClick={handleNext}
                                className="px-6 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-900 ease-in-out duration-500 disabled:bg-gray-200"
                                disabled={!selectedReturningFlight}
                              >
                                Next
                              </Button>
                            </Box>
                          </div>

                          {/* flightCards */}
                          {returningFlight.map((flight) => (
                            <FlightCard
                              key={flight.id}
                              flight={flight}
                              selectedFlight={selectedReturningFlight}
                              handleSelectFlight={handleSelectFlight("returning")}
                            />
                          ))}
                        </div>
                      )}

                      {/* OneWay step 3, review */}
                      {flightType === "Oneway" && activeStep === 2 && (
                        <div className="flex flex-col items-center">
                          {/* cart title */}
                          <span className="text-2xl font-semibold">Review Purchase</span>

                          {/* cart items */}
                          <CartItem flight={selectedDepartureFlight} />

                          <div className="flex justify-between items-center w-full">
                            {/* subtotal */}
                            <div className="flex text-xl justify-between w-full my-3 mr-8 py-2 border-y-gray-500 border-y">
                              <span className="font-bold text-gray-700">SubTotal</span>
                              <span className="text-gray-500">
                                {formatIDR.format(selectedDepartureFlight.price)}
                              </span>
                            </div>

                            {/* buttons */}
                            <div className="flex my-3">
                              <Button
                                disabled={activeStep === 1}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                                className="px-4 py-2 rounded-md bg-none border border-slate-500 text-gray-500 hover:bg-gray-200 ease-in-out duration-500 disabled:bg-gray-200 font-semibold"
                              >
                                Back
                              </Button>
                              <Box sx={{ flex: "1 1 auto" }} />

                              <Button
                                onClick={handleCheckout}
                                className="px-6 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-900 ease-in-out duration-500"
                              >
                                Checkout
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Roundtrip step 4, review */}
                      {flightType === "Roundtrip" && activeStep === 3 && (
                        <div className="flex flex-col items-center">
                          {/* cart title */}
                          <span className="text-2xl font-semibold">Review Purchase</span>

                          {/* cart items */}
                          <CartItem flight={selectedDepartureFlight} />
                          <CartItem flight={selectedReturningFlight} />

                          <div className="flex justify-between items-center w-full">
                            {/* subtotal */}
                            <div className="flex text-xl justify-between w-full my-3 mr-8 py-2 border-y-gray-500 border-y">
                              <span className="font-bold text-gray-700">SubTotal</span>
                              <span className="text-gray-500">
                                {formatIDR.format(
                                  selectedDepartureFlight.price + selectedReturningFlight.price
                                )}
                              </span>
                            </div>

                            {/* buttons */}
                            <div className="flex my-3">
                              <Button
                                disabled={activeStep === 1}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                                className="px-4 py-2 rounded-md bg-none border border-slate-500 text-gray-500 hover:bg-gray-200 ease-in-out duration-500 disabled:bg-gray-200 font-semibold"
                              >
                                Back
                              </Button>
                              <Box sx={{ flex: "1 1 auto" }} />

                              <Button
                                onClick={handleCheckout}
                                className="px-6 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-900 ease-in-out duration-500"
                              >
                                Checkout
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                )}
              </Box>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-[100vh] w-full items-center justify-center">
            <p className="py-3">404 No Flight Data!</p>
          </div>
        )}

        {!ticket && !isLoading && isError && (
          <div className="flex flex-col h-[100vh] w-full items-center justify-center">
            <p className="py-3">Error Boy!</p>
            <p className="py-2 text-sm font-normal">{isError}</p>
          </div>
        )}
      </div>
    </MainLayout>
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

  const response = await fetch("https://airtrip-be-production.up.railway.app/auth/whoami", config);
  const { data } = await response.json();

  if (data) {
    return {
      props: { user: data.data },
    };
  } else {
    return {
      props: { user: null },
    };
  }
}

export default Search;

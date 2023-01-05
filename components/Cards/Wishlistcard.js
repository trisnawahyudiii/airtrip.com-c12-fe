/* eslint-disable @next/next/no-img-element */
// dependencies
import axios from "axios";
import Swal from "sweetalert2";
import cookie from "js-cookie";
import Router from "next/router";

// components
import { Divider } from "@mui/material";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";

const WishlistCard = ({ wishlist }) => {
  const departure = new Date(wishlist.flight.departure);
  const arrival = new Date(wishlist.flight.arrival);

  const duration = (arrival - departure) / (1000 * 60);

  const hour = Math.floor(duration / 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const minute = Math.floor(duration % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  let formatIDR = new Intl.NumberFormat("ID", {
    style: "currency",
    currency: "IDR",
  });

  const handleDeleteWishlist = (id) => {
    Swal.fire({
      title: "Do you want to delete the item?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      console.log("delete confirmed");
      if (result.isConfirmed) {
        const token = cookie.get("accessToken");
        // console.log("token", token);

        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        axios
          .delete(
            "https://airtrip-be-production.up.railway.app/wishlists/delete/" + wishlist.id,
            config
          )
          .then((response) => {
            console.log("delete success");
            Swal.fire("Deleted!", "", "success");
            Router.reload();
          })
          .catch((err) => {
            console.log("delete error");
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong! ",
            });
          });
      } else if (result.isDenied) {
        console.log("delete cancled");
        Swal.fire("Action canceled", "", "info");
      }
    });
  };

  const handleBookFlight = () => {
    Router.push(
      `/flights/search?&flightType=Oneway&flightClass=${wishlist.flight.flight_class}&from=${
        wishlist.flight.from_airport.id
      }&to=${wishlist.flight.to_airport.id}&departureDate=${String(wishlist.flight.departure)}`
    );
  };

  return (
    <div className="flex flex-col w-full my-4 px-8 py-6 font-normal text-sm bg-slate-50 rounded-lg drop-shadow-md">
      {/* detail */}

      <div className="w-full">
        <div className="flex justify-between items-center w-full py-1 ">
          <span className="font-bold text-xl">
            {departure.getHours().toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
            :
            {departure.getMinutes().toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
          </span>
          <img src="/img/flightDurationLogo.png" alt="flight ilustration" />
          <span className="font-bold text-xl">
            {arrival.getHours().toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
            :
            {arrival.getMinutes().toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
          </span>
        </div>

        {/* airport iata */}
        <div className="flex justify-between items-center w-full py-1">
          <span className="font-semibold text-xl text-gray-500">
            ({wishlist.flight?.from_airport?.iata})
          </span>
          <span className="font-semibold text-xl text-gray-500">
            {hour}h{minute}m
          </span>
          <span className="font-semibold text-xl text-gray-500">
            ({wishlist.flight?.to_airport?.iata})
          </span>
        </div>

        {/* airport country */}
        <div className="flex justify-between items-center w-full py-1">
          <span className="text-gray-500">{wishlist.flight?.from_airport?.name}</span>
          <span className="text-gray-500">{wishlist.flight?.to_airport?.name}</span>
        </div>

        {/* flight_class */}
        <div className="flex justify-between items-center w-full py-1 mb-3">
          <div>
            <AirlineSeatReclineNormalIcon />
            <span className="text-gray-900 font-semibold capitalize">
              {wishlist.flight.flight_class} class
            </span>
          </div>
          <span className="text-gray-900 font-semibold">
            {formatIDR.format(wishlist.flight.price)}
          </span>
        </div>

        <Divider />

        {/* description */}
        <div className="flex flex-col justify-between w-full my-3">
          <span className="font-bold text-gray-700">Description</span>
          <span className="text-gray-500">{wishlist.flight.description}</span>
        </div>
      </div>

      <Divider />

      {/* harga dan button */}
      <div className="flex justify-end items-center w-full mt-5 ">
        <button
          className="uppercase px-6 py-2 ml-3 rounded-md font-semibold  text-gray-700 bg-none border border-gray-200 hover:bg-gray-200 ease-in-out duration-500"
          onClick={() => handleDeleteWishlist(wishlist.id)}
        >
          Delete
        </button>
        <button
          className="uppercase px-6 py-2 ml-3 rounded-md font-semibold text-white bg-gray-600 hover:bg-gray-900 ease-in-out duration-500 disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:text-gray-500"
          onClick={() => handleBookFlight()}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;

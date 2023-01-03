/* eslint-disable @next/next/no-img-element */
// components
import { Divider } from "@mui/material";

const CartItem = ({ flight }) => {
  const departure = new Date(flight.departure);
  const arrival = new Date(flight.arrival);

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
          <span className="font-semibold text-xl text-gray-500">({flight.from_airport.iata})</span>
          <span className="font-semibold text-xl text-gray-500">
            {hour}h{minute}m
          </span>
          <span className="font-semibold text-xl text-gray-500">({flight.to_airport.iata})</span>
        </div>

        {/* airport country */}
        <div className="flex justify-between items-center w-full py-1">
          <span className="text-gray-500">{flight.from_airport.name}</span>
          <span className="text-gray-500">{flight.to_airport.name}</span>
        </div>

        <Divider className="mb-3" />

        {/* details */}
        <div className="flex flex-col justify-between w-full my-3">
          <table className="table-auto">
            {/* subtitle */}
            <thead>
              <tr>
                <td>
                  <span className="font-bold text-gray-700">Details</span>
                </td>
              </tr>
            </thead>
            <tbody>
              {/* class */}
              <tr>
                <td>
                  <span className="text-gray-900 font-semibold capitalize">Flight Class</span>
                </td>
                <td>
                  <span className="text-gray-900 capitalize">{flight.flight_class}</span>
                </td>
              </tr>

              {/* price */}
              <tr>
                <td>
                  <span className="text-gray-900 font-semibold capitalize">Price</span>
                </td>
                <td>
                  <span className="text-gray-900 capitalize">{formatIDR.format(flight.price)}</span>
                </td>
              </tr>

              {/* departure */}
              <tr>
                <td>
                  <span className="text-gray-900 font-semibold capitalize">Departure</span>
                </td>
                <td>
                  <span className="text-gray-900 capitalize">{String(departure)}</span>
                </td>
              </tr>

              {/* arrival */}
              <tr>
                <td>
                  <span className="text-gray-900 font-semibold capitalize">Arrival</span>
                </td>
                <td>
                  <span className="text-gray-900 capitalize">{String(arrival)}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Divider />

        {/* description */}
        <div className="flex flex-col justify-between w-full my-3">
          <span className="font-bold text-gray-700">Description</span>
          <span className="text-gray-500">{flight.description}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

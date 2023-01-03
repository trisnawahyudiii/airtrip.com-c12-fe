import axios from "axios";
import React, { useEffect } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";

function parseDateString(date) {
  return new Date(date).toLocaleString("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

const Modal = ({ modal, setModal, data }) => {
  console.log(data);
  if (!data) return null;

  return (
    <PureModal
      isOpen={modal}
      width="800px"
      onClose={() => {
        setModal(false);
        return true;
      }}
    >
      <div className="flex-row space-y-3 relative">
        <div className="bg-blue-300 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4">
          <p>Ticket Detail</p>
        </div>
        <div className="flex justify-between">
          <p htmlFor="departure" className="font-semibold pr-2">
            Invoice Number
          </p>
          <p className="w-[75%] ">{data.invoice_number}</p>
        </div>
        <div className="flex justify-between">
          <p htmlFor="departure" className="font-semibold pr-2">
            Total price
          </p>
          <p className="w-[75%] ">{data.total_price}</p>
        </div>
        <div className="flex justify-between">
          <p htmlFor="departure" className="font-semibold pr-2">
            Order date
          </p>
          <p className="w-[75%] ">{parseDateString(data.createdAt)}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold pr-2">Flight type</p>
          <div className="w-[75%]">
            <p>{data.flight_type}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold pr-2">Passenger name</p>
          <p className="w-[75%]">{data.passenger.name}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold pr-2">Passenger address</p>
          <p className="w-[75%] ">{data.passenger.address}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold pr-2">Passenger email</p>
          <p className="w-[75%] ">{data.passenger.email}</p>
        </div>

        <hr />
        <h3 className="font-bold text-lg">Boarding pass pergi</h3>
        <div className="flex justify-between">
          <p className="font-semibold pr-2">Seat</p>
          <p className="w-[75%] ">
            {data.boardingPasses.boarding_pass_pergi.seat}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold pr-2">Departure</p>
          <p className="w-[75%] ">
            {parseDateString(
              data.boardingPasses.boarding_pass_pergi.flight.departure
            )}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold pr-2">Arrival</p>
          <p className="w-[75%] ">
            {parseDateString(
              data.boardingPasses.boarding_pass_pergi.flight.arrival
            )}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold pr-2">Flight class</p>
          <p className="w-[75%] ">
            {data.boardingPasses.boarding_pass_pergi.flight.flight_class}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold pr-2">Price</p>
          <p className="w-[75%] ">
            {data.boardingPasses.boarding_pass_pergi.flight.price}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold pr-2">Airplane</p>
          <p className="w-[75%] ">{`${data.boardingPasses.boarding_pass_pergi.flight.airplane.manufacture} ${data.boardingPasses.boarding_pass_pergi.flight.airplane.model_number}`}</p>
        </div>
        {data.boardingPasses.boarding_pass_pulang ? (
          <>
            <hr />
            <h3 className="font-bold text-lg">Boarding pass pulang</h3>
            <div className="flex justify-between">
              <p className="font-semibold pr-2">Seat</p>
              <p className="w-[75%] ">
                {data.boardingPasses.boarding_pass_pulang.seat}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold pr-2">Departure</p>
              <p className="w-[75%] ">
                {parseDateString(
                  data.boardingPasses.boarding_pass_pulang.flight.departure
                )}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold pr-2">Arrival</p>
              <p className="w-[75%] ">
                {parseDateString(
                  data.boardingPasses.boarding_pass_pulang.flight.arrival
                )}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold pr-2">Flight class</p>
              <p className="w-[75%] ">
                {data.boardingPasses.boarding_pass_pulang.flight.flight_class}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold pr-2">Price</p>
              <p className="w-[75%] ">
                {data.boardingPasses.boarding_pass_pulang.flight.price}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold pr-2">Airplane</p>
              <p className="w-[75%] ">{`${data.boardingPasses.boarding_pass_pulang.flight.airplane.manufacture} ${data.boardingPasses.boarding_pass_pulang.flight.airplane.model_number}`}</p>
            </div>
          </>
        ) : null}
        <div className="flex justify-between">
          <p className="font-semibold pr-2">Airplane</p>
          <p className="w-[75%] ">{`${data.boardingPasses.boarding_pass_pulang.flight.airplane.manufacture} ${data.boardingPasses.boarding_pass_pulang.flight.airplane.model_number}`}</p>
        </div>
      </div>
    </PureModal>
  );
};

export default Modal;

import React from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";

const ModalView = ({ data, modal, setModal }) => {
  return (
    <>
      <PureModal
        //header={<div className="bg-purple-600 p-2 font-bold text-lg text-center text-white">Category</div>}
        isOpen={modal}
        width="800px"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <div className="flex-row space-y-3 relative">
          <div className="bg-blue-300 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4">
            <p>Flight Detail</p>
          </div>
          <div className="flex justify-between">
            <p htmlFor="departure" className="font-semibold pr-2">
              Departure
            </p>
            <p className="w-[75%] ">{data.departure}</p>
          </div>
          <div className="flex justify-between">
            <p htmlFor="departure" className="font-semibold pr-2">
              Arrival
            </p>
            <p className="w-[75%] ">{data.arrival}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold pr-2">Flight Class</p>
            <div className="w-[75%]">
              <p>{data.flight_class}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <label className="font-semibold pr-2" htmlFor="price">
              Price
            </label>
            <p className="w-[75%]">{data.price}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold pr-2">From</p>
            <p className="w-[75%] ">{data.from.name}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-semibold pr-2">To</p>
            <p className="w-[75%] ">{data.to.name}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-semibold pr-2">Airplane</p>
            <p className="w-[75%] ">{data.airplane.name}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold pr-2" htmlFor="description">
              Description
            </p>
            <p className="w-[75%]">{data.description}</p>
          </div>
        </div>
      </PureModal>
    </>
  );
};

export default ModalView;

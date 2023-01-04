import React from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";

const ModalView = ({ data, modal, setModal }) => {
  if (!data) return null;
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
        <div className="flex-row space-y-3 relative">
          <div className="bg-blue-300 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4">
            <p>Airplane Detail</p>
          </div>
          <div className="flex justify-between">
            <p htmlFor="image" className="font-semibold pr-2">
              Image
            </p>
            <p className="w-3/4">{data.image}</p>
          </div>
          <div className="flex justify-between">
            <p htmlFor="model_number" className="font-semibold pr-2">
              Model Number
            </p>
            <p className="w-[-75%]">{data.model_number}</p>
          </div>
          <div className="flex justify-between">
            <p htmlFor="manufacture" className="font-semibold pr-2">
              Manufacture
            </p>
            <p className="w-[-75%]">{data.manufacture}</p>
          </div>
          <div className="flex justify-between">
            <p htmlFor="capacity" className="font-semibold pr-2">
              Capacity
            </p>
            <p className="w-[-75%]">{data.capacity}</p>
          </div>
          <div className="flex justify-between">
            <p htmlFor="capacity" className="font-semibold pr-2">
              Specs
            </p>
            <p className="w-[-75%]">
              {data.specs.reduce(
                (specsString, spec) => `${specsString}, ${spec}`
              )}
            </p>
          </div>
        </div>
      </PureModal>
    </>
  );
};
export default ModalView;

import axios from "axios";
import React from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";

const ModalDeleteConfirm = ({ data, modal, setModal, fetchFlights }) => {
  function handleDelete() {
    axios
      .delete(`flights/delete/${data}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        fetchFlights();
        setModal(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }
  return (
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
          <p>Flight Delete</p>
        </div>
        <p className="text-center font-semibold text-lg">
          Are you sure want to delete flight {data}?
        </p>
        <div className="flex justify-between gap-3">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white p-3 w-full mt-5 text-lg"
          >
            Delete
          </button>
          <button
            onClick={() => {
              setModal(false);
            }}
            className="bg-blue-300 text-white p-3 w-full mt-5 text-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </PureModal>
  );
};

export default ModalDeleteConfirm;

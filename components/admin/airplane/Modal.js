/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import Cookies from "js-cookie";

async function getBase64(file) {
  return new Promise(function (resolve) {
    const reader = new FileReader();
    reader.onloadend = function () {
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

const Modal = ({ modal, setModal, data, setData, fetchAirplanes }) => {
  async function handleSubmit(e) {
    e.preventDefault();
    for (const key in data) {
      if (!data[key] && key !== "image") {
        alert("please fill out the form!");
        return;
      }
    }

    axios({
      url:
        "https://airtrip-be-production.up.railway.app" +
        (data.id ? `/airplanes/update/${data.id}` : "/airplanes/create"),
      method: data.id ? "PUT" : "POST",
      data: {
        ...data,
        image: data.image ? await getBase64(selectedImage.current[0]) : "",
        specs: data.specs.split(","),
      },
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    })
      .then((response) => {
        fetchAirplanes();
        setModal(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "image") {
      return imageChange(e);
    }
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  //For Image Preview
  const selectedImage = useRef(null);
  // This function will be triggered when the file field change

  const imageChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      selectedImage.current = e.target.files;

      setData((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    selectedImage.current = null;
    setData((prev) => {
      return { ...prev, image: "" };
    });
  };

  useEffect(() => {
    if (!modal) {
      selectedImage.current = null;
    }
  }, [modal]);

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
        <form className="flex-row space-y-3 relative" onSubmit={handleSubmit}>
          <div className="bg-blue-300 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4">
            <p>Airplane</p>
          </div>

          <div className="flex justify-between">
            <label className="font-semibold pr-2" htmlFor="image">
              Image
            </label>
            <div className="flex flex-col w-3/4">
              <input
                className="border-2"
                type="file"
                accept="image/*"
                name="image"
                onChange={imageChange}
                value={data.image}
              />
              <div>
                <div className="flex overflow-auto items-center my-2 p-2">
                  {selectedImage.current &&
                    [...selectedImage.current].map((file, index) => {
                      return (
                        <img
                          key={index}
                          src={URL.createObjectURL(file)}
                          className="w-auto h-32 mr-1 rounded-sm border-4"
                        />
                      );
                    })}
                  {selectedImage.current && (
                    <button
                      onClick={removeSelectedImage}
                      className="bg-red-500 p-2 rounded-md text-white h-min"
                    >
                      Remove This Image
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <label className="font-semibold pr-2" htmlFor="model_number">
              Model Number
            </label>
            <input
              className="border-2 border-blue-300/50 w-[75%] "
              type="text"
              name="model_number"
              onChange={handleChange}
              value={data.model_number}
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="manufacture" className="font-semibold pr-2">
              Manufacture
            </label>
            <input
              className="border-2 border-blue-300/50 w-[75%] "
              type="text"
              name="manufacture"
              onChange={handleChange}
              value={data.manufacture}
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="capacity" className="font-semibold pr-2">
              Capacity
            </label>
            <input
              className="border-2 border-blue-300/50 w-[75%] "
              type="number"
              name="capacity"
              onChange={handleChange}
              value={data.capacity}
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="specs" className="font-semibold pr-2">
              Specs
            </label>
            <input
              className="border-2 border-blue-300/50 w-[75%] "
              type="text"
              name="specs"
              onChange={handleChange}
              value={data.specs}
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-300 text-white p-3 w-full mt-5 text-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </PureModal>
    </>
  );
};

export default Modal;

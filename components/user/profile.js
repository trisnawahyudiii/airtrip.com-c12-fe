/* eslint-disable @next/next/no-img-element */

// dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";
import Swal from "sweetalert2";

// components
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

// layout for page
import UserLayout from "../../layouts/UserLayout";

const ProfilePage = ({ user }) => {
  const [valid, setValid] = useState(true);
  const [hasChange, setHasChange] = useState(false);
  const [inputs, setInputs] = useState({ ...user });
  const [imageSrc, setImageSrc] = useState(user.image);
  const [file, setFile] = useState(null);
  const [passwordInput, setPasswordInput] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (prop) => (event) => {
    if (!hasChange) setHasChange(true);

    setInputs({ ...inputs, [prop]: event.target.value });
  };

  const handlePassword = (prop) => (event) => {
    if (!hasChange) setHasChange(true);

    setPasswordInput({ ...passwordInput, [prop]: event.target.value });
  };

  const handleImage = (event) => {
    if (!hasChange) setHasChange(true);

    const reader = new FileReader();

    reader.onload = (onLoadEvent) => {
      setImageSrc(onLoadEvent.target.result);
      setFile(undefined);
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  const validate = () => {
    let validated = false;
    if (inputs !== user) {
      console.log("user has changed!");
      validated = true;
      setValid(true);
    }

    // check if there's any change(s) on userdata and password
    if (passwordInput.password !== "" || passwordInput.confirmPassword !== "") {
      console.log("password has changed");

      if (passwordInput.password !== passwordInput.confirmPassword) {
        validated = false;
        setValid(false);
        return validated;
      }
      validated = true;
      setValid(true);
      return validated;
    }

    return validated;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validate the inputs
    const validated = validate();

    if (validated) {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          const reqBody = {
            email: inputs.email,
            phone: inputs.phone,
            name: inputs.name,
            address: inputs.address,
          };

          if (passwordInput.password !== "") {
            reqBody.password = passwordInput.password;
          }

          if (imageSrc.indexOf("default-profile") === -1) {
            reqBody.image = imageSrc;
          } else {
            reqBody.image = "";
          }

          const token = cookie.get("accessToken");

          console.log("client update page token", token);
          console.log("client update body", reqBody);

          axios
            .put("/api/users/update/" + user.id, reqBody, {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              console.log(response);
              Swal.fire("Saved!", "", "success");
              cookie.set("accessToken", response.data.data.accessToken);
              return;
            })
            .catch((error) => {
              console.log(error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! ",
              });
              return;
            });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <>
      {user ? (
        <UserLayout user={user}>
          <div className="mt-[65px] py-10 flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex flex-col justify-center w-full min-w-0 break-words border-0 rounded-lg shadow-lg lg:w-6/12 bg-slate-100">
                <div className="px-6 py-6 mb-0 bg-white rounded-t">
                  <div className="flex justify-center text-center">
                    <h6 className="text-xl font-bold text-slate-700">Akun Saya</h6>
                  </div>
                </div>
                <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                  <form onSubmit={handleSubmit}>
                    <h6 className="mt-3 mb-6 text-sm font-bold uppercase text-slate-400">
                      INFORMASI PENGGUNA
                    </h6>
                    {/* user image */}
                    <div className="flex flex-col justify-center items-center my-7">
                      <div className="relative flex w-fit">
                        <img
                          src={imageSrc}
                          alt="user profile"
                          width={150}
                          height={150}
                          className="rounded-full"
                        />
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="label"
                          className="absolute bottom-0 right-0 bg-white shadow-lg"
                        >
                          <input
                            hidden
                            accept="image/*"
                            type="file"
                            name="image"
                            onChange={handleImage}
                          />
                          <PhotoCamera fontSize="large" />
                        </IconButton>
                      </div>
                    </div>

                    <div className="flex flex-wrap">
                      {/* username */}
                      <div className="w-full px-4 lg:w-6/12">
                        <div className=" w-full mb-3">
                          <label
                            className="block mb-2 text-xs font-bold uppercase text-slate-600"
                            htmlFor="grid-password"
                          >
                            Username
                          </label>
                          <input
                            type="text"
                            name="userName"
                            id="name-input"
                            value={inputs.name}
                            onChange={handleChange("name")}
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                          />
                        </div>
                      </div>

                      {/* email */}
                      <div className="w-full px-4 lg:w-6/12">
                        <div className=" w-full mb-3">
                          <label
                            className="block mb-2 text-xs font-bold uppercase text-slate-600"
                            htmlFor="grid-password"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            name="userEmail"
                            id="email-input"
                            value={inputs.email}
                            onChange={handleChange("email")}
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                          />
                        </div>
                      </div>

                      {/* saldo */}
                      <div className="w-full px-4 lg:w-6/12">
                        <div className=" w-full mb-3">
                          <label
                            className="block mb-2 text-xs font-bold uppercase text-slate-600 "
                            htmlFor="grid-password"
                          >
                            Saldo
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-slate-200 border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                            value={inputs.saldo}
                            disabled
                          />
                        </div>
                      </div>

                      {/* Phone number */}
                      <div className="w-full px-4 lg:w-6/12">
                        <div className=" w-full mb-3">
                          <label
                            className="block mb-2 text-xs font-bold uppercase text-slate-600"
                            htmlFor="grid-password"
                          >
                            Phone
                          </label>
                          <input
                            type="text"
                            value={inputs.phone}
                            onChange={handleChange("phone")}
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                          />
                        </div>
                      </div>

                      {/* address */}
                      <div className="w-full px-4 lg:w-6/12">
                        <div className=" w-full mb-3">
                          <label
                            className="block mb-2 text-xs font-bold uppercase text-slate-600"
                            htmlFor="grid-password"
                          >
                            Address
                          </label>
                          <input
                            type="text"
                            value={inputs.address}
                            onChange={handleChange("address")}
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="mt-6 border-b-1 border-slate-300" />

                    <h6 className="mt-3 mb-6 text-sm font-bold uppercase text-slate-400">
                      Account Setting
                    </h6>

                    <div className="flex flex-wrap">
                      {/* password input */}
                      <div className="w-full px-4 lg:w-6/12">
                        <div className=" w-full mb-3">
                          <div className="w-full mb-6 md:w-full ">
                            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                              password
                            </label>
                            <input
                              type="password"
                              value={passwordInput.password}
                              onChange={handlePassword("password")}
                              className={
                                "w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring" +
                                (hasChange && !valid ? " border-red-600 focus:ring-rose-600" : "")
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {/* confirm password */}
                      <div className="w-full px-4 lg:w-6/12">
                        <div className=" w-full mb-3">
                          <div className="w-full mb-6 md:w-full ">
                            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                              Confirm password
                            </label>
                            <input
                              type="password"
                              value={passwordInput.confirmPassword}
                              onChange={handlePassword("confirmPassword")}
                              className={
                                "w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring" +
                                (hasChange && !valid ? " border-red-600 focus:ring-rose-600" : "")
                              }
                            />

                            {/*  */}
                            {hasChange && (
                              <span
                                className={"text-[12px] text-red-600 " + (valid ? "hidden" : "")}
                              >
                                Password do not match!
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* submit Button */}
                    <div className="flex justify-end items-center px-3">
                      <button
                        className={
                          "px-4 py-2 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none focus:outline-none" +
                          (hasChange
                            ? " bg-slate-700 active:bg-slate-700 hover:shadow-md"
                            : " bg-slate-400 text-slate-200 cursor-not-allowed")
                        }
                        type="submit"
                      >
                        Update
                      </button>
                    </div>

                    <hr className="mt-6 border-b-1 border-slate-300" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </UserLayout>
      ) : (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
};

export default ProfilePage;

import React, { useState, useEffect } from "react";
// import { useLocation } from 'react-router-dom';
import axios from "axios";
import Link from "next/link";
import Image from "next/Image";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// layout for page

import MainLayout from "../../layouts/MainLayout";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // check if there is token in the localStorage
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return;
    }

    // fetch the user data
    const fetchUser = async (token) => {
      const config = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch("/api/auth/whoami", config)
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          setError(err);
        });

      setUser(response.data.data);
    };

    fetchUser(token);
  }, []);

  console.log("user:", user);
  return (
    <>
      {user ? (
        <MainLayout>
          <div className="relative w-[100vw] h-[100vh] mt-[66px]">
            {/* background image */}
            <div className="absolute top-0 w-full h-full bg-no-repeat ">
              <Image
                src="/img/4.jpg"
                layout="fill"
                objectFit="cover"
                alt="background "
              />
            </div>

            <div className="w-full h-full flex items-center justify-center">
              <div className="relative flex flex-col justify-center w-full min-w-0 mb-6 break-words border-0 rounded-lg shadow-lg lg:w-6/12 bg-slate-100">
                <div className="px-6 py-6 mb-0 bg-white rounded-t">
                  <div className="flex justify-center w-full px-4">
                    <div className="relative">
                      {/* <Image
                  
                  alt="profile"
                  src={Gambar}
                  className="absolute h-auto -m-16 -ml-20 align-middle border-none rounded-full shadow-xl lg:-ml-16 max-w-120-px"
                /> */}
                    </div>
                  </div>
                  <div className="flex justify-center text-center">
                    <h6 className="text-xl font-bold text-slate-700">
                      Akun Saya
                    </h6>

                    {/* <button
                      className="px-4 py-2 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-slate-700 active:bg-slate-600 hover:shadow-md focus:outline-none"
                      type="button"
                    >
                      Settings
                    </button> */}
                  </div>
                </div>
                <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                  <form>
                    <h6 className="mt-3 mb-6 text-sm font-bold uppercase text-slate-400">
                      INFORMASI PENGGUNA
                    </h6>
                    <div className="flex flex-wrap">
                      {/* username */}
                      <div className="w-full px-4 lg:w-6/12">
                        <div className="relative w-full mb-3">
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
                            value={user.name}
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                          />
                        </div>
                      </div>

                      {/* email */}
                      <div className="w-full px-4 lg:w-6/12">
                        <div className="relative w-full mb-3">
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
                            value={user.email}
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                          />
                        </div>
                      </div>

                      {/* saldo */}
                      <div className="w-full px-4 lg:w-6/12">
                        <div className="relative w-full mb-3">
                          <label
                            className="block mb-2 text-xs font-bold uppercase text-slate-600"
                            htmlFor="grid-password"
                          >
                            Saldo
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                          ></input>
                        </div>
                      </div>

                      {/* Phone number */}
                      <div className="w-full px-4 lg:w-6/12">
                        <div className="relative w-full mb-3">
                          <label
                            className="block mb-2 text-xs font-bold uppercase text-slate-600"
                            htmlFor="grid-password"
                          >
                            Phone
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                          >
                            {user.phone}
                          </input>
                        </div>
                      </div>

                      {/* address */}
                      <div className="w-full px-4 lg:w-6/12">
                        <div className="relative w-full mb-3">
                          <label
                            className="block mb-2 text-xs font-bold uppercase text-slate-600"
                            htmlFor="grid-password"
                          >
                            Address
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                            // defaultValue="Jln. Kp Driyahan 233 Semarang Utara"
                          >
                            {user.address}
                          </input>
                        </div>
                      </div>
                    </div>

                    <hr className="mt-6 border-b-1 border-slate-300" />

                    <h6 className="mt-3 mb-6 text-sm font-bold uppercase text-slate-400">
                      Account Setting
                    </h6>
                    <div className="flex flex-wrap">
                      <div className="w-full px-4 lg:w-12/12">
                        <div className="relative w-full mb-3">
                          <div className="w-full mb-6 md:w-full ">
                            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                              password
                            </label>
                            <button className="px-2 py-1 text-sm text-gray-900 bg-white border border-gray-400 rounded-md shadow-sm appearance-none ">
                              change your password
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* <div className="w-full px-4 lg:w-4/12">
                        <div className="relative w-full mb-3">
                          <label
                            className="block mb-2 text-xs font-bold uppercase text-slate-600"
                            htmlFor="grid-password"
                          >
                            City
                          </label>
                          <input
                            type="email"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                            defaultValue="New York"
                          />
                        </div>
                      </div> */}
                      {/* <div className="w-full px-4 lg:w-4/12">
                        <div className="relative w-full mb-3">
                          <label
                            className="block mb-2 text-xs font-bold uppercase text-slate-600"
                            htmlFor="grid-password"
                          >
                            Country
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                            defaultValue="United States"
                          />
                        </div>
                      </div> */}
                      {/* <div className="w-full px-4 lg:w-4/12">
                        <div className="relative w-full mb-3">
                          <label
                            className="block mb-2 text-xs font-bold uppercase text-slate-600"
                            htmlFor="grid-password"
                          >
                            Postal Code
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                            defaultValue="Postal Code"
                          />
                        </div>
                      </div> */}
                    </div>

                    <div className="flex justify-end items-center">
                      <Link href="/">
                        <button
                          className="px-4 py-2 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-slate-700 active:bg-slate-600 hover:shadow-md focus:outline-none"
                          type="button"
                        >
                          Update
                        </button>
                      </Link>
                    </div>

                    <hr className="mt-6 border-b-1 border-slate-300" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </MainLayout>
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
};

export default ProfilePage;

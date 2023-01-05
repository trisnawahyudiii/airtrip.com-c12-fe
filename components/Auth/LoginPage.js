/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import axios from "axios";
import cookie from "js-cookie";

import Link from "next/link";
import Router from "next/router";
import Auth from "../../layouts/Auth";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (prop) => (event) => {
    setInputs({ ...inputs, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    const authenticationRequest = {
      email: inputs.email,
      password: inputs.password,
    };

    axios
      .post("/api/auth/login", authenticationRequest)
      .then(async (res) => {
        cookie.set("accessToken", res.data.data.accessToken, { expires: 7 });
        let role;
        await axios
          .get("/api/auth/whoami", {
            headers: { Authorization: `Bearer ${res.data.data.accessToken}` },
          })
          .then((response) => {
            role = response.data.data.data.role.name;
          });
        console.log(role);
        if (role === "ADMIN") {
          return Router.push("/admin");
        }
        Router.push("/");
      })
      .catch((error) => {
        alert(`Incorrect email or password`);
        console.log(error);
      });
    event.preventDefault();
  };

  return (
    <>
      <Auth>
        <div className="container h-full px-4 mx-auto">
          <div className="flex items-center content-center justify-center h-full">
            <div className="px-4 w-full md:w-6/12 xl:w-4/12">
              <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border-0 rounded-lg shadow-lg bg-slate-200">
                <div className="px-6 py-6 mb-0 rounded-t">
                  <div className="mb-3 text-center">
                    <h6 className="text-sm font-bold text-slate-500">
                      Sign in with
                    </h6>
                  </div>
                  <div className="text-center btn-wrapper">
                    <button
                      className="inline-flex items-center px-4 py-2 mb-1 mr-2 text-xs  font-bold uppercase transition-all duration-150 ease-linear bg-white rounded shadow outline-none active:bg-slate-50 text-slate-700 focus:outline-none hover:shadow-md"
                      type="button"
                    >
                      <img
                        src="/img/facebook.png"
                        alt="Facebook icon"
                        className="w-5 mr-1"
                      />
                      facebook
                    </button>
                    <button
                      className="inline-flex items-center px-4 py-2 mb-1 mr-1 text-xs  font-bold uppercase transition-all duration-150 ease-linear bg-white rounded shadow outline-none active:bg-slate-50 text-slate-700 focus:outline-none hover:shadow-md"
                      type="button"
                    >
                      <img
                        src="/img/google.svg"
                        alt="Google icon"
                        className="w-5 mr-1"
                      />
                      Google
                    </button>
                  </div>
                  <hr className="mt-6 border-b-1 border-slate-300" />
                </div>
                <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                  <div className="mb-3 font-bold text-center text-slate-400">
                    <small>Or sign in with credentials</small>
                  </div>

                  {/* form input */}
                  <form onSubmit={handleSubmit}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block mb-2 text-xs font-bold uppercase text-slate-600"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={inputs.email}
                        // inputProps={{ pattern: '[a-zA-Z]{4,16}$' }}
                        onChange={handleChange("email")}
                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                        placeholder="Email"
                        required
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block mb-2 text-xs font-bold uppercase text-slate-600"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={inputs.password}
                        onChange={handleChange("password")}
                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          id="customCheckLogin"
                          type="checkbox"
                          className="w-5 h-5 ml-1 transition-all duration-150 ease-linear border-0 rounded form-checkbox text-slate-700"
                        />
                        <span className="ml-2 text-sm font-semibold text-slate-600">
                          Remember me
                        </span>
                      </label>
                    </div>

                    <div className="mt-6 text-center">
                      <button
                        className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-slate-700 active:bg-slate-700 hover:shadow-lg focus:outline-none"
                        type="submit"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>

                  {/* optional choice */}
                  <div className="relative flex flex-wrap ">
                    <div className="w-1/2">
                      <Link href="/forgotpassword" className="text-black">
                        <small>Forgot password?</small>
                      </Link>
                    </div>
                    <div className="w-1/2 text-right">
                      <Link href="/users/register" className="text-black">
                        <small>Create new account</small>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Auth>
    </>
  );
};

export default Login;

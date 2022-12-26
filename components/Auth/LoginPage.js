import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Link from "next/link";
import Router from "next/router";
import Image from "next/Image.js";

import Auth from "../../layouts/Auth";
import Google from "../../public/img/google.svg";
import Facebook from "../../public/img/facebook.png";

// import '../../styles/tailwind.css'
// import '../../styles/style.css'
// layout for page

// import Auth from "../../components/layouts/Auth.js";

const Login = () => {
  // const navigate = useNavigate();
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
    console.log(authenticationRequest);

    axios
      .post(
        "https://airtrip-be-production.up.railway.app/login",
        authenticationRequest
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("accessToken", res.data.accessToken);
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
            <div className="w-full px-4 lg:w-4/12">
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
                      <Image src={Facebook} alt="..." className="w-5 mr-1" />
                      facebook
                    </button>
                    <button
                      className="inline-flex items-center px-4 py-2 mb-1 mr-1 text-xs  font-bold uppercase transition-all duration-150 ease-linear bg-white rounded shadow outline-none active:bg-slate-50 text-slate-700 focus:outline-none hover:shadow-md"
                      type="button"
                    >
                      <Image src={Google} alt="..." className="w-5 mr-1" />
                      Google
                    </button>
                  </div>
                  <hr className="mt-6 border-b-1 border-slate-300" />
                </div>
                <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                  <div className="mb-3 font-bold text-center text-slate-400">
                    <small>Or sign in with credentials</small>
                  </div>
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
                      {/* <form onSubmit={this.onLoginSubmit}>
                      <div className="input-group"><input onChange={e => this.setState({email: e.target.value})} type="email" className="mt-3 form-control" placeholder="Email"/></div>
                      <div className="input-group"><input onChange={e => this.setState({password: e.target.value})} type="password" className="mt-3 form-control" placeholder="Password"/></div>
                      {this.loadingButton()}
                     </form> */}
                    </div>
                  </form>
                </div>
              </div>

              {/* <div className="relative flex flex-wrap mt-6">
             <button
              className="px-4 py-2 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-slate-700 active:bg-slate-600 hover:shadow-md focus:outline-none"
              type="button"
            >
              Forgot password?
            </button>
            <button
              className="px-4 py-2 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-slate-700 active:bg-slate-600 hover:shadow-md focus:outline-none"
              type="button"
            >
              Create new account
            </button>
            </div> */}
              <div className="relative flex flex-wrap mt-6">
                <div className="w-1/2">
                  <Link href="/forgotpassword" legacyBehavior>
                    <a href="#pablo" className="text-black">
                      <small>Forgot password?</small>
                    </a>
                  </Link>
                </div>
                <div className="w-1/2 text-right">
                  <Link href="/register" legacyBehavior>
                    <a href="#pablo" className="text-black">
                      <small>Create new account</small>
                    </a>
                  </Link>
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

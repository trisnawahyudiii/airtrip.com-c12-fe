// dependencies
import { useState } from "react";
import Link from "next/link";

// components
import { Divider } from "@mui/material";

// other

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 z-50 flex flex-wrap w-full px-2 py-3 bg-white shadow navbar-expand-md">
        <div className="container flex flex-col lg:flex-row px-4 mx-auto ">
          <div className="relative flex w-full justify-between lg:w-fit lg:justify-start">
            {/* company logo */}
            <Link href="/" legacyBehavior>
              <a className="inline-block py-2 mr-4 text-sm font-bold leading-relaxed uppercase text-blue whitespace-nowrap">
                Airtrip
              </a>
            </Link>

            {/* mobile menu button */}
            <button
              className="block px-3 py-1 text-xl leading-none bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>

          {/* navLinks */}
          <div
            className={
              "lg:flex items-center flex-grow bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <div className="top-0 flex flex-wrap items-center mr-auto">
              <ul className="flex flex-col mr-auto list-none lg:flex-row">
                <li className="flex items-center">
                  <Link
                    className="flex items-center px-3 py-4 text-xs font-bold uppercase hover:text-slate-500 text-slate-700 lg:py-2"
                    href="/"
                  >
                    <i className="mr-4 text-lg text-slate-400 leading-lg" />
                    Home
                  </Link>
                </li>
                <li className="flex items-center">
                  <a
                    className="flex items-center px-3 py-4 text-xs font-bold uppercase hover:text-slate-500 text-slate-700 lg:py-2"
                    href="#"
                  >
                    <i className="mr-4 text-lg text-slate-400 leading-lg" />
                    Destination
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    className="flex items-center px-3 py-4 text-xs font-bold uppercase hover:text-slate-500 text-slate-700 lg:py-2"
                    href="#Footer"
                  >
                    <i className="mr-4 text-lg text-slate-400 leading-lg" />
                    Package
                  </a>
                </li>
              </ul>
            </div>

            {/* social media */}
            <ul className="flex flex-col list-none lg:flex-row lg:ml-2 mt-3 lg:mt-0">
              <li className="flex items-center">
                <p
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase hover:text-slate-500 text-slate-700 lg:py-2"
                  target="_blank"
                >
                  <i className="text-lg text-slate-400 fab fa-facebook  " />
                  <span className="inline-block mx-2 lg:hidden">Share</span>
                </p>
              </li>

              <li className="flex items-center">
                <p
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase hover:text-slate-500 text-slate-700 lg:py-2"
                  target="_blank"
                >
                  <i className="text-lg text-slate-400 fab fa-twitter  " />
                  <span className="inline-block mx-2 lg:hidden">Tweet</span>
                </p>
              </li>

              <li className="flex items-center">
                <p
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase hover:text-slate-500 text-slate-700 lg:py-2"
                  target="_blank"
                >
                  <i className="text-lg text-slate-400 fab fa-instagram  " />
                  <span className="inline-block mx-2 lg:hidden">Star</span>
                </p>
              </li>

              <li className="flex items-center mt-3 lg:mt-0">
                <Link href="/users/login">
                  <button
                    className="px-4 py-2 mb-3 ml-3 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-slate-700 active:bg-slate-600 hover:shadow-lg focus:outline-none lg:mr-1 lg:mb-0"
                    type="button"
                  >
                    <i className=""></i> Login
                  </button>
                </Link>
                <Link href="/users/register">
                  <button
                    className="px-4 py-2 mb-3 ml-3 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-slate-700 active:bg-slate-600 hover:shadow-lg focus:outline-none lg:mr-1 lg:mb-0"
                    type="button"
                  >
                    <i className=""></i> Register
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

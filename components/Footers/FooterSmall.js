import React from "react";

export default function FooterSmall(props) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? "absolute w-full bottom-0 bg-blueGray-800"
            : "relative")
        }
      >
        <div className="container px-4 mx-auto">
          <hr className="mb-6 border-b-1 border-blueGray-600" />
          <div className="flex flex-wrap items-center justify-center md:justify-between">
            <div className="w-full px-2 md:w-4/12">
              <div className="py-1 text-sm font-semibold text-center text-blueGray-500 md:text-left">
              Copyright © {new Date().getFullYear()} Airtrip {" "}. All rights reserved
                {/* <a
                  href="https://www.creative-tim.com?ref=nnjs-footer-small"
                  className="py-1 text-sm font-semibold text-white hover:text-blueGray-300"
                >
                  Creative Tim
                </a> */}
              </div>
            </div>
            <div className="w-full px-4 md:w-8/12">
              <ul className="flex flex-wrap justify-center list-none md:justify-end">
                <li>
                  <a
                    href="https://www.creative-tim.com?ref=nnjs-footer-small"
                    className="block px-3 py-1 text-sm font-semibold text-blueGray-500 hover:text-blueGray-300"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.creative-tim.com/presentation?ref=nnjs-footer-small"
                    className="block px-3 py-1 text-sm font-semibold text-blueGray-500 hover:text-blueGray-300"
                  >
                    Term & Condition
                  </a>
                </li>
                <li>
                  <a
                    href="http://blog.creative-tim.com?ref=nnjs-footer-small"
                    className="block px-3 py-1 text-sm font-semibold text-blueGray-500 hover:text-blueGray-300"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
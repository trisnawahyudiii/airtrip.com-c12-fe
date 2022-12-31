import React from "react";

export default function FooterSmall(props) {
  return (
    <>
      <footer
        className={
          props.absolute
            ? "absolute inset-x-0 bottom-0 w-full bg-slate-800"
            : " bg-slate-800 relative "
        }
      >
        <div className="container px-4 py-4 mx-auto">
          <div className="flex flex-wrap items-center justify-center md:justify-between">
            <div className="w-full px-2 md:w-4/12">
              <div className="py-1 text-sm font-semibold text-center text-slate-500 md:text-left">
                Copyright © {new Date().getFullYear()} Airtrip . All rights
                reserved
              </div>
            </div>
            <div className="w-full px-4 md:w-8/12">
              <ul className="flex flex-wrap justify-center list-none md:justify-end">
                <li>
                  <a
                    href="https://www.creative-tim.com?ref=nnjs-footer-small"
                    className="block px-3 py-1 text-sm font-semibold text-slate-500 hover:text-slate-300"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.creative-tim.com/presentation?ref=nnjs-footer-small"
                    className="block px-3 py-1 text-sm font-semibold text-slate-500 hover:text-slate-300"
                  >
                    Term & Condition
                  </a>
                </li>
                <li>
                  <a
                    href="http://blog.creative-tim.com?ref=nnjs-footer-small"
                    className="block px-3 py-1 text-sm font-semibold text-slate-500 hover:text-slate-300"
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

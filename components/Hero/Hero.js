import React from "react";
import Link from "next/link";

// components
import CariTiketForm from "../CariTiketForm/CariTiketForm";

const Hero = () => {
  return (
    <div className="relative flex items-center content-center justify-center pt-16 pb-32 min-h-screen-75 overflow-hidden">
      {/* background image */}
      <div
        className="absolute w-full h-full bg-center bg-cover top-8"
        style={{
          backgroundImage:
            "url('https://www.itda.ac.id/uploads/blog/42b2e725f27b8df105cfde216e5e05b2.jpg')",
        }}
      >
        <span
          id="blackOverlay"
          className="absolute w-full h-full left-0 top-0 bg-black opacity-75"
        ></span>
      </div>

      {/* hero text */}
      <div className="container relative mx-auto">
        <div className="flex flex-wrap items-center">
          <div className="w-full px-2 mx-auto text-center w-[60%]">
            <div className="px-8">
              <h1 className="text-4xl font-semibold text-white">
                Journey to Explore world
              </h1>
              <p className="mt-8 text-lg text-slate-200">
                Kepentingan anda adalah perhatian kami, apa yang penting bagi
                anda penting bagi kami. Rencanakan perjalanan anda bersama kami
                sekarang, dan lihatlah langit yang tersenyum.
              </p>

              {/* button cari tiket */}
              <div className="mt-12">
                <Link href="/caritiket" legacyBehavior>
                  <a className="px-6 py-4 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none get-started focus:outline-none bg-slate-700 active:bg-slate-500 hover:shadow-lg">
                    Cari Tiket
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* form cari tiket */}
      
    </div>
  );
};

export default Hero;

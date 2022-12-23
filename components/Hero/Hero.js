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
          <div className="px-2 mx-auto text-center w-[60%]">
            <div className="px-8">
              <h1 className="text-4xl font-semibold text-white">
                Journey to Explore world
              </h1>
              <p className="mt-8 text-lg text-slate-200">
                Kepentingan anda adalah perhatian kami, apa yang penting bagi
                anda penting bagi kami. Rencanakan perjalanan anda bersama kami
                sekarang, dan lihatlah langit yang tersenyum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

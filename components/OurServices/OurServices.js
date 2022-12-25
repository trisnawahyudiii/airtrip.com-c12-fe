import React from "react";

const OurServices = () => {
  return (
    <div className="w-full bg-gunmetal h-[70vh]">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap pt-52">
          <div className="w-full px-5 text-center md:w-4/12 ">
            <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
              <div className="flex-auto px-4 py-5">
                <div className="inline-flex items-center justify-center w-12 h-12 p-3 mb-5 text-center text-white bg-red-400 rounded-full shadow-lg">
                  <i className=" fas fa-globe"></i>
                </div>
                <h6 className="">Search Everywhere, explore anywhere</h6>
                <p className="mt-2 mb-4 text-blueGray-500">
                  Enter your departure airport and travel dates, then hit
                  ‘Everywhere’. You’ll see flights to every destination in the
                  world, cheapest first.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full px-5 text-center md:w-4/12 ">
            <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
              <div className="flex-auto px-4 py-5">
                <div className="inline-flex items-center justify-center w-12 h-12 p-3 mb-5 text-center text-white rounded-full shadow-lg bg-sky-400">
                  <i className="far fa-percent"></i>
                </div>
                <h6 className="">go further with transparent pricing</h6>
                <p className="mt-2 mb-4 text-blueGray-500">
                  Cheapest flight deals. There are no hidden costs. With us, the
                  price you see when you search is the price you will pay.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full px-5 text-center md:w-4/12 ">
            <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
              <div className="flex-auto px-4 py-5">
                <div className="inline-flex items-center justify-center w-12 h-12 p-3 mb-5 text-center text-white rounded-full shadow-lg bg-emerald-400">
                  <i className="far fa-clock"></i>
                </div>
                <h6 className="">
                  Book when it &apos; s best with Price Alerts
                </h6>
                <p className="mt-2 mb-4 text-blueGray-500">
                  but not quite ready to book? Set up Price Alerts and we’ll let
                  you know when your flight price goes up or down.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;

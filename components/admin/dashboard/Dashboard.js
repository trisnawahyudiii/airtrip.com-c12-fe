import React from "react";
import TicketsTable from "./TicketsTable";

const Dashboard = () => {
  return (
    <>
      <main className="p-6 sm:p-10 space-y-6">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
          </div>
        </div>

        <section>
          <div className="flex flex-col md:col-span-2 md:row-span-3 bg-white shadow rounded-lg">
            <div className="px-6 py-5 font-semibold border-b border-gray-100">
              Tickets
            </div>
            <div className="flex-grow">
              <TicketsTable />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;

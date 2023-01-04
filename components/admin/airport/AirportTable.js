import Table from "rc-table";
import React, { useState } from "react";
import Pagination from "react-js-pagination";

const AirportTable = ({ data }) => {
  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "no",
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
    },
    {
      title: "Airport Name",
      dataIndex: "name",
      key: "name",
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
    },
    {
      title: "IATA",
      dataIndex: "iata",
      key: "iata",
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
    },
  ];

  //Pagination
  const [activePage, setActivePage] = useState(15);
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <>
      <Table
        columns={columns}
        data={data}
        rowKey="id"
        className="p-4 w-full text-center rc-table-custom font-semibold "
      />
    </>
  );
};

export default AirportTable;

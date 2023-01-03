import React, { useEffect, useRef, useState } from "react";
import Table from "rc-table";
import axios from "axios";
import Modal from "./Modal";
import { Loading } from "../common/Loading";
import Cookies from "js-cookie";

function parseDateString(date) {
  return new Date(date).toLocaleString("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

const TicketsTable = () => {
  const [modal, setModal] = useState(false);
  const [tickets, setTickets] = useState(null);
  const dataOnview = useRef(null);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      width: "42px",
    },
    {
      title: "Buyer",
      dataIndex: "",
      key: "buyer",
      className: "text-white min-w-fit bg-gray-800 p-2 border-r-2 border-b-2",
      render: (column, data) => {
        return data.passenger.name;
      },
    },
    {
      title: "Order date",
      dataIndex: "",
      key: "orderdate",
      className: "text-white min-w-fit bg-gray-800 p-2 border-r-2 border-b-2",
      render: (column, data) => {
        return parseDateString(data.createdAt);
      },
    },

    {
      title: "Total",
      dataIndex: "total_price",
      key: "total",
      align: "right",
      className: "text-white min-w-fit bg-gray-800 p-2 border-r-2 border-b-2",
    },
    {
      title: "Operations",
      dataIndex: "",
      key: "operations",
      width: "132px",
      className: "text-white min-w-fit bg-gray-800 p-2 border-b-2",
      render: (column, data) => (
        <>
          <a
            role={"button"}
            onClick={() => {
              dataOnview.current = data;
              setModal(true);
            }}
          >
            View
          </a>{" "}
        </>
      ),
    },
  ];

  function fetchTickets() {
    axios
      .get("https://airtrip-be-production.up.railway.app/tickets", {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      })
      .then((response) => {
        setTickets(response.data.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }
  useEffect(() => {
    fetchTickets();
  }, []);

  if (!tickets) return <Loading />;

  return (
    <>
      <Table
        columns={columns}
        data={tickets}
        rowKey="id"
        className="bg-blue-250 p-4 w-full text-center rc-table-custom font-semibold overflow-x-auto overflow-y-auto"
        sticky={true}
        style={{ maxHeight: "460px" }}
      />
      <Modal data={dataOnview.current} modal={modal} setModal={setModal} />
    </>
  );
};

export default TicketsTable;

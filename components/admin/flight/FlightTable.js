import Table from "rc-table";
import React, { useRef, useState } from "react";
import Pagination from "react-js-pagination";
import Modal from "./Modal";
import ModalView from "./ModalView";
import ModalDeleteConfirm from "./ModalDeleteConfirm";

function parseDateString(date) {
  return new Date(date).toLocaleString("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

function dateToDateTimeLocal(dateStr) {
  return new Date(dateStr)
    .toLocaleString("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(" ", "T");
}

const FlightTable = ({ datas, fetchFlights, airports, airplanes }) => {
  const dataInit = {
    departure: "",
    arrival: "",
    flight_class: "",
    price: "",
    from: "",
    to: "",
    airplane_id: "",
    description: "",
  };
  const [dataOnEdit, setDataOnEdit] = useState(dataInit);
  const dataView = useRef({ ...dataInit, airplane: "" });
  const dataDelete = useRef(0);

  const [modalEdit, setModalEdit] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "no",
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      width: "42px",
    },
    {
      title: "Departure",
      dataIndex: "",
      key: "departure",
      className: "text-white min-w-fit bg-gray-800 p-2 border-r-2 border-b-2",
      render: (column, data) => {
        return parseDateString(data.departure);
      },
    },
    {
      title: "Arrival",
      dataIndex: "",
      key: "arrival",
      className: "text-white min-w-fit bg-gray-800 p-2 border-r-2 border-b-2",
      render: (column, data) => {
        return parseDateString(data.arrival);
      },
    },
    {
      title: "Flight Class",
      dataIndex: "flight_class",
      key: "Class",
      width: "400",
      className: "text-white min-w-fit bg-gray-800 p-2 border-r-2 border-b-2",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      className: "text-white min-w-fit bg-gray-800 p-2 border-r-2 border-b-2",
    },
    {
      title: "From",
      dataIndex: "",
      key: "from",
      className: "text-white min-w-fit bg-gray-800 p-2 border-r-2 border-b-2",
      render: (column, data) => {
        return data.from.name;
      },
    },
    {
      title: "To",
      dataIndex: "",
      key: "to",
      className: "text-white min-w-fit bg-gray-800 p-2 border-r-2 border-b-2",
      render: (column, data) => {
        return data.to.name;
      },
    },
    {
      title: "Airplane",
      dataIndex: "",
      key: "airplane",
      className: "text-white min-w-fit bg-gray-800 p-2 border-r-2 border-b-2",
      render: (column, data) => {
        return data.airplane.name;
      },
    },
    {
      title: "Operations",
      dataIndex: "",
      key: "operations",
      className: "text-white min-w-fit bg-gray-800 p-2 border-b-2",
      render: (column, data) => (
        <>
          <a
            role={"button"}
            onClick={() => {
              dataView.current = {
                ...data,
                departure: parseDateString(data.departure),
                arrival: parseDateString(data.arrival),
              };
              setModalView(true);
            }}
          >
            View
          </a>{" "}
          |{" "}
          <a
            onClick={() => {
              setDataOnEdit({
                id: data.id,
                departure: dateToDateTimeLocal(data.departure),
                arrival: dateToDateTimeLocal(data.arrival),
                flight_class: data.flight_class,
                price: data.price,
                from: data.from.id,
                to: data.to.id,
                airplane_id: data.airplane.id,
                description: data.description,
              });
              setModalEdit(true);
            }}
            role={"button"}
          >
            Edit
          </a>{" "}
          |{" "}
          <a
            role={"button"}
            onClick={() => {
              dataDelete.current = data.id;
              setModalDelete(true);
            }}
          >
            Delete
          </a>
        </>
      ),
    },
  ];

  //Pagination
  const [activePage, setActivePage] = useState(15);
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <>
      <Modal
        fetchFlights={fetchFlights}
        data={dataOnEdit}
        setData={setDataOnEdit}
        modal={modalEdit}
        setModal={setModalEdit}
        airports={airports}
        airplanes={airplanes}
      />
      <ModalView
        data={dataView.current}
        modal={modalView}
        setModal={setModalView}
      />
      <ModalDeleteConfirm
        data={dataDelete.current}
        modal={modalDelete}
        setModal={setModalDelete}
        fetchFlights={fetchFlights}
      />
      <Table
        columns={columns}
        data={datas}
        rowKey="id"
        className="bg-blue-250 p-4 w-full text-center rc-table-custom font-semibold overflow-x-auto overflow-y-auto"
        sticky={true}
        style={{ maxHeight: "460px" }}
      />
    </>
  );
};

export default FlightTable;

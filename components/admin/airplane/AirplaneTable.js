import Table from "rc-table";
import React, { useRef, useState } from "react";
import Pagination from "react-js-pagination";
import Modal from "./Modal";
import ModalView from "./ModalView";
import ModalDeleteConfirm from "./ModalDeleteConfirm";

const AirplaneTable = ({ datas, fetchAirplanes }) => {
  const dataInit = {
    image: "",
    model_number: "",
    manufacture: "",
    capacity: "",
    specs: "",
  };
  const [dataOnEdit, setDataOnEdit] = useState(dataInit);
  const dataView = useRef(null);
  const dataDelete = useRef(0);

  const [modalEdit, setModalEdit] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      width: "42px",
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      render: (column, data) => (
        <img src={data.image} alt="airplane" className="w-34" />
      ),
    },
    {
      title: "Model Number",
      dataIndex: "model_number",
      key: "model_number",
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
    },
    {
      title: "Manufacture",
      dataIndex: "manufacture",
      key: "manufacture",
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
    },
    {
      title: "Operations",
      dataIndex: "",
      key: "operations",
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      render: (column, data) => {
        return (
          <>
            <a
              role={"button"}
              onClick={() => {
                dataView.current = data;
                setModalView(true);
              }}
            >
              View
            </a>{" "}
            |{" "}
            <a
              onClick={() => {
                const { createdAt, deletedAt, updatedAt, ...cleanedData } =
                  data;
                setDataOnEdit({
                  ...cleanedData,
                  image: "",
                  specs: cleanedData.specs.reduce(
                    (specsStr, spec) => `${specsStr}, ${spec}`
                  ),
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
        );
      },
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
        fetchAirplanes={fetchAirplanes}
        data={dataOnEdit}
        setData={setDataOnEdit}
        modal={modalEdit}
        setModal={setModalEdit}
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
        fetchAirplanes={fetchAirplanes}
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

export default AirplaneTable;

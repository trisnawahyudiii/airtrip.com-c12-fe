// dependencies
import React from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";

// components

// other


const CariTiketForm = () => {
  return (
    // ini dibagi 2, kiri untuk pilihan penerbangan, kanan untuk input field
    <div className="container bg-white w-[90%] rounded-lg w-full h-full z-100 shadow-sm mt-10">
      {/* pilihan tipe penerbangan */}
      <div>
        {/* asal */}
        
        {/* tujuan */}

        {/* flight class */}

        <div>
          {" "}
          {/** jika pilhan roundtrip maka muncul tanggal kepulangan */}
          {/* tanggal keberangkatan */}
          {/* tanggal pulang (for round trip) */}
        </div>

        {/* button cari penerbangan */}
      </div>
    </div>
  );
};

export default CariTiketForm;

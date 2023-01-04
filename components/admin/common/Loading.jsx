import { CircularProgress } from "@mui/material";
import React from "react";

export const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <CircularProgress className="mb-3" />
      <p className="font-semibold">Loading data...</p>
    </div>
  );
};

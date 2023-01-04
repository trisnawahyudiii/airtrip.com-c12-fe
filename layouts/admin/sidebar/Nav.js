import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FlightIcon from "@mui/icons-material/Flight";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { IconButton } from "@mui/material";

const Nav = ({ sidebarOutsideClick }) => {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [subMenuToggleStatus, setSubMenuToggleStatus] = useState(false);

  const sidebarClose = () => {
    setSidebarStatus(false);
  };

  const sidebarOpen = () => {
    setSidebarStatus(true);
  };

  const subMenuToggle = () => {
    setSubMenuToggleStatus(!subMenuToggleStatus);
  };

  useEffect(() => {
    if (sidebarOutsideClick) {
      setSidebarStatus(false);
    }
  }, [sidebarOutsideClick]);
  //console.log("sidebar Nav", sidebarOutsideClick)
  return (
    <>
      <nav className="flex flex-col mx-4 my-6 space-y-4">
        <div className="inline-flex items-center justify-center ">
          {sidebarStatus ? (
            <IconButton
              onClick={sidebarClose}
              className="inline-block h-12 cursor-pointer"
              color="primary"
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          ) : (
            <IconButton
              className="inline-block h-12 cursor-pointer"
              onClick={sidebarOpen}
              color="primary"
            >
              <ArrowForwardIosIcon />
            </IconButton>
          )}
        </div>

        <NavItem
          hrefLink="/admin/airplane"
          sidebarStatus={sidebarStatus}
          menuTitle="Airplane"
          subMenu={false}
          subMenuArray={null}
        >
          <FlightIcon className="h-10 w-9" />
        </NavItem>

        <NavItem
          hrefLink="/admin/airport"
          sidebarStatus={sidebarStatus}
          menuTitle="Airport"
          subMenu={false}
          subMenuArray={null}
        >
          <ConnectingAirportsIcon className="h-10 w-9" />
        </NavItem>

        <NavItem
          hrefLink="/admin/flight"
          sidebarStatus={sidebarStatus}
          menuTitle="Flight"
          subMenu={false}
          subMenuArray={null}
        >
          <FlightTakeoffIcon className="h-10 w-9" />
        </NavItem>

        {/* <NavItem
          hrefLink="/user"
          sidebarStatus={sidebarStatus}
          menuTitle="User"
          subMenu={false}
          subMenuArray={null}
        >
          <AccountCircleIcon className="h-10 w-9" />
        </NavItem> */}

        {/* this menu has child Menu     */}
        {/* <NavItem
          hrefLink='#'
          sidebarStatus={sidebarStatus}
          menuTitle="Rute"
          subMenu={true}
          subMenuArray={childMenu}
        >
          <CollectionIcon className="h-10" />
        </NavItem>  */}
      </nav>
    </>
  );
};

export default Nav;

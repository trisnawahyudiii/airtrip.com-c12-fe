/* eslint-disable @next/next/no-img-element */
// dependencies
import { useState } from "react";
import Router from "next/router";
import cookie from "js-cookie";
import Link from "next/link";

// components
import {
  Avatar,
  Box,
  Tooltip,
  IconButton,
  Divider,
  MenuItem,
  ListItemIcon,
} from "@mui/material";

import Menu from "@mui/material/Menu";

import Logout from "@mui/icons-material/Logout";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
// other

// get accesToken from localstorage

const Navbar = ({ userData }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (event) => {
    cookie.remove("accessToken");
    Router.push("/");
  };

  // console.log("navbar user", userData);

  return (
    <>
      <nav className="fixed top-0 z-50 flex flex-wrap w-full px-2 py-3 bg-white shadow navbar-expand-md">
        <div className="container flex flex-col lg:flex-row px-4 mx-auto ">
          <div className="relative flex w-full justify-between lg:w-fit lg:justify-start">
            {/* company logo */}
            <Link
              href="/"
              className="flex items-center justify-center text-xl mr-4 font-bold leading-relaxed uppercase text-blue whitespace-nowrap"
            >
              Airtrip
            </Link>

            {/* mobile menu button */}
            <button
              className="block px-3 py-1 text-xl leading-none bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>

          {/* navLinks */}
          <div
            className={
              "lg:flex items-center flex-grow bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <div className="top-0 flex flex-wrap items-center mr-auto">
              <ul className="flex flex-col mr-auto list-none lg:flex-row">
                <li className="flex items-center">
                  <Link
                    className="flex items-center px-3 py-4 text-xs font-bold uppercase hover:text-slate-500 text-slate-700 lg:py-2"
                    href="/"
                  >
                    <i className="mr-4 text-lg text-slate-400 leading-lg" />
                    Home
                  </Link>
                </li>
                <li className="flex items-center">
                  <a
                    className="flex items-center px-3 py-4 text-xs font-bold uppercase hover:text-slate-500 text-slate-700 lg:py-2"
                    href="#"
                  >
                    <i className="mr-4 text-lg text-slate-400 leading-lg" />
                    Destination
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    className="flex items-center px-3 py-4 text-xs font-bold uppercase hover:text-slate-500 text-slate-700 lg:py-2"
                    href="#Footer"
                  >
                    <i className="mr-4 text-lg text-slate-400 leading-lg" />
                    Package
                  </a>
                </li>
              </ul>
            </div>

            {/* social media */}
            <ul className="flex flex-col list-none lg:flex-row lg:ml-2 mt-3 lg:mt-0">
              <li className="flex items-center">
                <p
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase hover:text-slate-500 text-slate-700 lg:py-2"
                  target="_blank"
                >
                  <i className="text-lg text-slate-400 fab fa-facebook  " />
                  <span className="inline-block mx-2 lg:hidden">Share</span>
                </p>
              </li>

              <li className="flex items-center">
                <p
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase hover:text-slate-500 text-slate-700 lg:py-2"
                  target="_blank"
                >
                  <i className="text-lg text-slate-400 fab fa-twitter  " />
                  <span className="inline-block mx-2 lg:hidden">Tweet</span>
                </p>
              </li>

              <li className="flex items-center">
                <p
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase hover:text-slate-500 text-slate-700 lg:py-2"
                  target="_blank"
                >
                  <i className="text-lg text-slate-400 fab fa-instagram  " />
                  <span className="inline-block mx-2 lg:hidden">Star</span>
                </p>
              </li>

              {/* login and register button */}
              {!userData && (
                <li className="flex items-center mt-3 lg:mt-0">
                  <Link href="/users/login">
                    <button
                      className="px-4 py-2 mb-3 ml-3 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-slate-700 active:bg-slate-600 hover:shadow-lg focus:outline-none lg:mr-1 lg:mb-0"
                      type="button"
                    >
                      <i className=""></i> Login
                    </button>
                  </Link>
                  <Link href="/users/register">
                    <button
                      className="px-4 py-2 mb-3 ml-3 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-slate-700 active:bg-slate-600 hover:shadow-lg focus:outline-none lg:mr-1 lg:mb-0"
                      type="button"
                    >
                      <i className=""></i> Register
                    </button>
                  </Link>
                </li>
              )}

              {/* if user has logged in show user control panel */}
              {userData && (
                <li className="flex items-center mt-3 lg:mt-0">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      {/* <Avatar sx={{ width: 32, height: 32 }}>
                        {userData.name[0]}
                      </Avatar> */}

                      <Avatar
                        alt="user avatar"
                        src={
                          userData.image
                            ? userData.image
                            : "/img/default-profile.jpg"
                        }
                      />
                    </IconButton>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    {userData.role.name === "ADMIN" && (
                      <MenuItem>
                        <ListItemIcon>
                          <AdminPanelSettingsIcon fontSize="small" />
                        </ListItemIcon>
                        Admin Panel
                      </MenuItem>
                    )}

                    <Link href="/users/profile">
                      <MenuItem>
                        <ListItemIcon>
                          <ManageAccountsIcon fontSize="small" />
                        </ListItemIcon>
                        My account
                      </MenuItem>
                    </Link>

                    <MenuItem>
                      <ListItemIcon>
                        <BookmarksIcon fontSize="small" />
                      </ListItemIcon>
                      Wishlist
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

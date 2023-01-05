/* eslint-disable @next/next/no-img-element */
// dependencies
import { useState, useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";

// components
import UserLayout from "../../layouts/UserLayout";
import WishlistCard from "../Cards/WishlistCard";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";

const WishlistPage = ({ user }) => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const token = cookie.get("accessToken");

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get("https://airtrip-be-production.up.railway.app/wishlists", config)
      .then((response) => {
        // console.log(response.data);
        setWishlist(response.data.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
    setLoading(false);
  }, [setWishlist]);

  return (
    <>
      {user && !loading ? (
        <UserLayout user={user}>
          <div className="mt-[65px] py-10 px-32 flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex flex-col justify-center items-center w-full min-w-0 break-words border-0 rounded-lg shadow-lg bg-primaryBlue">
                {/* header */}
                <span className="text-white text-2xl font-semibold py-3 uppercase">Wishlist</span>
                <div className="flex flex-col justify-center w-full min-w-0 break-words border-0 rounded-lg shadow-lg bg-slate-100 py-6 px-8">
                  {wishlist.length === 0 ? (
                    <div className="flex flex-col items-center">
                      <img src="/img/noItem.png" alt="no item found" className="w-[200px]" />
                      <div className="py-2">
                        <code className="text-xl font-semibold text-gray-600">404. Not found!</code>
                        <span className="text-gray-500">You dont have any item here.</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {wishlist.map((item, index) => (
                        <WishlistCard key={index} wishlist={item} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </UserLayout>
      ) : (
        <div>
          <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      )}
    </>
  );
};

export default WishlistPage;

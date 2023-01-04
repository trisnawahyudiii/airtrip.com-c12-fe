import axios from "axios";
import { NextResponse } from "next/server";

export default function middleware(req) {
  const token = req.cookies.get("accessToken");
  const url = req.url;

  if (url.includes("/admin")) {
    if (!token) {
      return NextResponse.redirect("localhost:8000/users/login");
    }

    axios
      .get("https://airtrip-be-production.up.railway.app/whoami")
      .then((response) => {
        // if admin redirect to admin page
        if (response.data.data.role.name === "ADMIN") {
          return NextResponse.next();
        }
        // if buyer redirect to homepage
        return NextResponse.redirect("/");
      })
      .catch(() => {
        NextResponse.redirect("localhost:8000/users/login");
      });
  }
}

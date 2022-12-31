import axios from "axios";
import { verify } from "jsonwebtoken";

export default async function login(req, res) {
  const secret = process.env.JWT_SIGNATURE_KEY;

  if (!req.body) {
    res.status(404).json({
      status: "FAIL",
      message: "ERROR!",
    });
  }

  const { email, password } = req.body;

  const url = process.env.BACKEND_API_URL;
  axios
    .post(url + "/login", {
      email,
      password,
    })
    .then((response) => {
      res.status(201).json({
        status: "OK",
        data: response.data,
      });
    })
    .catch((error) => {
      res.status(404).json({
        status: "FAIL",
        error,
      });
    });
}

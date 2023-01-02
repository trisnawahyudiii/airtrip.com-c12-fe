import axios from "axios";

export default async function whoAmI(req, res) {
  const { authorization } = req.headers;

  axios
    .get("https://airtrip-be-production.up.railway.app/whoami", {
      headers: {
        "Content-type": "application/json",
        Authorization: authorization,
      },
    })
    .then((response) => {
      res.status(201).json({
        status: "OK",
        data: response.data,
      });
    })
    .catch((err) => {
      res.status(422).json({
        status: "FAIL",
        message: err,
      });
    });
}

import axios from "axios";

//api_url: url
export default async function search(req, res) {
  axios
    .get("https://airtrip-be-production.up.railway.app/flights/search")
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

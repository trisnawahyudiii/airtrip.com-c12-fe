import axios from "axios";

// api_url: localhost:8000/api/airports/list
export default async function list(req, res) {
  axios({
    method: "get",
    url: "https://airtrip-be-production.up.railway.app/airports",
  })
    .then((response) => {
      console.log;
      res.status(200).json({
        status: "OK",
        data: response.data,
      });
    })
    .catch((error) =>
      res.status(422).json({
        status: "FAIL",
        message: error,
      })
    );
}

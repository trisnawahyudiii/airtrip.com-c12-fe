import axios from "axios";

export default async function update(req, res) {
  const { id } = req.query;

  const { authorization } = req.headers;

  console.log("client api update attempt");

  axios
    .put("https://airtrip-be-production.up.railway.app/users/update/" + id, req.body, {
      headers: {
        "Content-type": "application/json",
        Authorization: authorization,
      },
    })
    .then((response) => {
      // console.log(response);
      res.status(200).json({
        status: "OK",
        data: response.data,
      });
    })
    .catch((error) => {
      res.status(422).json({
        status: "FAIL",
        error,
      });
    });
}

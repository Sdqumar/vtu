import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //   const config =

  await axios({
    method: "get",
    url: "https://sandbox.vtpass.com/api/service-variations?serviceID=dstv",
    headers: {
      Authorization: `Basic ${process.env.VTPASS}`,
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
      res.status(400).json(error.response.data);
    });
}

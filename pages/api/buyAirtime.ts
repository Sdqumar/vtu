import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { network, phoneNumber, amount } = req.body;

  const data = {
    network,
    amount,
    mobile_number: phoneNumber,
    Ported_number: true,
    airtime_type: "VTU", //VTU or awuf4U or Share and Sell
  };
  console.log(data);

  axios({
    method: "post",
    url: "https://www.superjaraapi.com/api/topup/",
    headers: {
      Authorization: `Token ${process.env.SUPERJARAAPIa}`,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error.response.data);
      res.status(400).json(error.response.data);
    });
}

import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await axios({
    method: "POST",
    data: {
      amount: 1000,
      email: "sdqumar09@gmail.com",
    },
    url: "https://uecom.000webhostapp.com/vtu/payment-api/paystack.php",
  })
    .then(function (response) {
      console.log(response.data);
      console.log(response);

      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
      // res.status(400).json(error.response.data);
    });
}

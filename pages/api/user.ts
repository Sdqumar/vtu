import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../lib/firebaseNode";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //   const config = {
  //     method: "get",
  //     url: "https://www.superjaraapi.com/api/user/",
  //     headers: {
  //       Authorization: `Token ${process.env.SUPERJARA_API}`,
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       console.log(JSON.stringify(response.data));
  //       res.send(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });

  const data = {
    // network: networkId, //query "/api/get/network/"  to get all available networks, and their ID
    network: 1, //query "/api/get/network/"  to get all available networks, and their ID
    // mobile_number: phoneNumber,
    mobile_number: "08143104693",
    plan: 220, //query "/api/network/ Plans" endpoint to get all available data plans
    Ported_number: true,
  };
  try {
    const APITransaction = await axios({
      method: "post",
      url: "https://www.superjaraapi.com/api/data/",
      headers: {
        Authorization: `Token ${process.env.SUPERJARA_API}`,
        "Content-Type": "application/json",
      },
      data: data,
    });
    // console.log(APITransaction);
    console.log(APITransaction.data);
    res.status(200).end();
  } catch (error: any) {
    console.log(error?.response.status);
    console.log(error?.response.data);
    res.status(200).end();
  }

  // await axios({
  //   method: "POST",
  //   data: {
  //     data: {
  //       customer: { email: "sdqumar09@gmail.com" },
  //       channel: "dedicated_nuban",
  //     },
  //   },
  //   url: "http://localhost:5001/vtu-app-93616/us-central1/payStackWebhook",
  // })
  //   .then(function (response) {
  //     console.log(response.data);
  //     console.log(response);

  //   })
  // .catch(function (error) {
  //   console.log(error);
  //   // res.status(400).json(error.response.data);
  // });
}

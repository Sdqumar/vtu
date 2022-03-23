import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data?: any[];
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const data = await axios({
      method: "post",
      url: "https://sandbox.vtpass.com/api/merchant-verify",
      data: { billersCode: "1212121212", serviceID: "dstv" },
      headers: {
        Authorization: `Basic ${process.env.VTPASS}`,
        "Content-Type": "application/json",
      },
    });
    console.log(data.data);

    res.status(200).json(data.data);
  } catch (error) {
    // console.log(error.response.data);

    res.status(400).json({ error });
  }
}

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
  const urls = [
    "https://sandbox.vtpass.com/api/service-variations?serviceID=dstv",
    "https://sandbox.vtpass.com/api/service-variations?serviceID=gotv",
    "https://sandbox.vtpass.com/api/service-variations?serviceID=startimes",
    "https://sandbox.vtpass.com/api/service-variations?serviceID=showmax",
  ];

  try {
    const newPromise = urls.map((url) =>
      axios({
        method: "get",
        url: url,
        headers: {
          Authorization: `Basic ${process.env.VTPASS}`,
          "Content-Type": "application/json",
        },
      })
    );
    const result = await Promise.all(newPromise);

    const data = result.map((item) => item.data.content);

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
}

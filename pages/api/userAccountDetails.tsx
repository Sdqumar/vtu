import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "./utills";

type Data = {
  message?: string;
  error: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let token = await getToken();
  token = token.responseBody.accessToken;

  const authorization = `Bearer ${token}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: authorization,
  };
  const body = JSON.parse(req.body);

  const url =
    "https://sandbox.monnify.com/api/v2/bank-transfer/reserved-accounts/" +
    body.email;

  try {
    const data = await fetch(url, {
      headers,
    });

    const result = await data.json();

    if (!result.requestSuccessful) {
      throw new Error(result.responseMessage);
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);

    res.status(400).send({ error: "Error User Account Created!" });
  }
}

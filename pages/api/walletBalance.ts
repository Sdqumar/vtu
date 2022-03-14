import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "./utills";

type Data = {
  message?: string;
  error?: any;
  result?: any;
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
  const { accountNumber } = req.body;

  const url = `https://sandbox.monnify.com/api/v2/disbursements/wallet-balance?accountNumber=${accountNumber}`;

  try {
    const data = await fetch(url, {
      method: "GET",
      headers,
    });
    const result = await data.json();

    if (!result.requestSuccessful) {
      throw new Error(result.responseMessage);
    }
    console.log(result.responseMessage);

    res.status(200).send({ message: "User Wallet Balance", result });
  } catch (error) {
    console.log(error);

    res.status(400).send({ error: "Error getting user Wallet Balance!" });
  }
}

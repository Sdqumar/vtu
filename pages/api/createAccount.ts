import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message?: string;
  error?: any;
  accountNumber?: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
  };
  const body = JSON.parse(req.body);

  const data = JSON.stringify({
    email: body.email,
    first_name: body.firstName,
    last_name: body.lastName,
    phone: body.phoneNumber,
  });

  try {
    const customer = await axios({
      method: "post",
      url: "https://api.paystack.co/customer",
      data,
      headers,
    });

    const accountData = JSON.stringify({
      customer: customer.data.data.id,
      preferred_bank: "wema-bank",
    });

    const acount = await axios({
      method: "POST",
      url: "https://api.paystack.co/dedicated_account",
      data: accountData,
      headers: headers,
    });
    const accountNumber: number = acount.data.data.account_number;

    res.status(200).send({ message: "User Account Created!", accountNumber });
  } catch (error) {
    console.log(error);

    res.status(400).send({ error: "Error User Account Created!" });
  }
}

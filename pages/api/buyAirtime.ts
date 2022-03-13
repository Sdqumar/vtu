import axios from "axios";
import { FieldValue } from "firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../lib/firebaseNode";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { values, uid } = req.body;
  const { network, phoneNumber, amount } = values;
  const data = {
    network,
    amount,
    mobile_number: phoneNumber,
    Ported_number: true,
    airtime_type: "VTU", //VTU or awuf4U or Share and Sell
  };
  console.log(amount);
  console.log(-Number(amount));

  const userRef = firestore.collection("users").doc(uid);

  await userRef.update({
    walletBalance: FieldValue.increment(-Number(amount)),
    totalFunded: FieldValue.increment(-Number(amount)),
    totalSpent: FieldValue.increment(Number(amount)),
  });

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

import axios from "axios";
import { FieldValue } from "firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../lib/firebaseNode";
const { v4: uuidv4 } = require("uuid");

type Data = {
  message?: string;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { values, user } = req.body;
  const { network, phoneNumber, amount, pin } = values;
  const { uid } = user;
  const request_id = uuidv4();

  const getTransaction = (message: string, status: string) => {
    return {
      uid,
      message,
      status,
      network,
      amount,
      request_id,
      type: " Airtime Payment",
      name: network + " Airtime ",
      to: phoneNumber,
      date: FieldValue.serverTimestamp(),
    };
  };

  const userRef = firestore.collection("users").doc(uid);
  const transactionRef = firestore.collection("transactions");

  try {
    let user = await userRef.get();
    let userData = user.data()!;

    if (userData.pin !== pin) {
      throw new Error("incorrect pin");
    }
    if (userData.walletBalance < amount) {
      throw new Error("insufficent funds");
    }

    const APITransaction = await axios({
      method: "post",
      url: "https://alagusiy.com/api/airtime",
      data: {
        token: process.env.ALAGUSIY_API,
        mobile: phoneNumber,
        network,
        amount,
        request_id,
      },
    });

    if (APITransaction.data.code !== 200) {
      throw new Error("insufficent account funds");
    }

    const transaction = getTransaction("Transaction Successful", "delivered");

    await transactionRef.add(transaction);
    await userRef.update({
      walletBalance: FieldValue.increment(-Number(amount)),
      totalSpent: FieldValue.increment(Number(amount)),
    });

    res.status(200).json({ message: "Transaction Successful" });
  } catch (error) {
    console.log(error);

    const transaction = getTransaction("Failed Transactions ", "failed");
    await transactionRef.add(transaction);

    res.status(400).send({ error });
  }
}

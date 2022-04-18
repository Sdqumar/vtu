import axios from "axios";
import { FieldValue } from "firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../lib/firebaseNode";
import { withSentry } from "@sentry/nextjs";
const { v4: uuidv4 } = require("uuid");

type Data = {
  message?: string;
  error?: any;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
      name: network + " ₦" + amount + " Airtime ",
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
        network: network.toUpperCase(),
        amount,
        request_id,
      },
    });
    console.log(APITransaction.data);

    if (APITransaction.data.code != "200") {
      throw new Error("insufficent account funds");
    }

    const transaction = getTransaction("Transaction Successful", "Delivered");

    await transactionRef.add(transaction);
    await userRef.update({
      walletBalance: FieldValue.increment(-Number(amount)),
      totalSpent: FieldValue.increment(Number(amount)),
    });

    res.status(200).json({ message: "Transaction Successful" });
  } catch (error) {
    console.log(error);

    const transaction = getTransaction("Failed Transactions ", "Failed");
    await transactionRef.add(transaction);

    res.status(400).send({ error });
  }
};
export default withSentry(handler);

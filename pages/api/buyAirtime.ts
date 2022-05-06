import axios from "axios";
import { FieldValue } from "firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../lib/firebaseNode";
import { withSentry } from "@sentry/nextjs";
const { v4: uuidv4 } = require("uuid");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { values, user, networkId } = req.body;
  const { network, phoneNumber, amount } = values;
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
  const transactionError = firestore.collection("transactionError");

  try {
    let user = await userRef.get();
    let userData = user.data()!;

    if (userData.walletBalance < amount) {
      throw new Error("insufficent funds");
    }

    const data = {
      network: networkId,
      amount,
      mobile_number: phoneNumber,
      Ported_number: true,
      airtime_type: "VTU",
    };

    const APITransaction = await axios({
      method: "post",
      url: "https://www.superjaraapi.com/api/topup/",
      headers: {
        Authorization: `Token ${process.env.SUPERJARA_API}`,
        "Content-Type": "application/json",
      },
      data: data,
    });
    console.log(APITransaction.data);

    const transaction = getTransaction("Transaction Successful", "Delivered");

    await transactionRef.add(transaction);
    await userRef.update({
      walletBalance: FieldValue.increment(-Number(amount)),
      totalSpent: FieldValue.increment(Number(amount)),
    });

    res.status(200).json({ message: "Transaction Successful" });
  } catch (error: any) {
    console.log(error.response?.data?.error[0]);
    console.log(error.response.status);

    const transaction = getTransaction("Failed Transaction ", "Failed");
    await transactionError.add({
      ...transaction,
      error: {
        message: error.response.data.error[0],
        status: error.response.status,
      },
    });
    await transactionRef.add(transaction);
    res.status(400).send(error.response?.data?.error[0]);
  }
};
export default withSentry(handler);

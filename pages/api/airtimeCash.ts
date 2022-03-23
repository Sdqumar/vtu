import axios from "axios";
import { FieldValue } from "firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../lib/firebaseNode";

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

  const getTransaction = <t extends string>(message: t, status: t) => {
    return {
      uid,
      message,
      status,
      network,
      amount,
      type: "Airtime to Cash",
      name: `${amount} Airtime to Cash`,
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

    const transaction = getTransaction("Request Sent", "pending");

    await transactionRef.add(transaction);

    res.status(200).json({ message: "Transaction Successful" });
  } catch (error) {
    const transaction = getTransaction("Failed Transactions ", "failed");
    await transactionRef.add(transaction);
    console.log(error);

    res.status(400).send({ error });
  }
}

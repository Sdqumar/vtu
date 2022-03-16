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
  const { phoneNumber, amount, pin, examCard } = values;
  const { uid } = user;

  const getTransaction = <t extends string>(message: t, status: t) => {
    return {
      uid,
      message,
      status,
      amount,
      type: "Exam Card Payment",
      name: `${examCard}`,
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

    const transaction = getTransaction("Transaction Successful", "delivered");

    await transactionRef.add(transaction);
    await userRef.update({
      walletBalance: FieldValue.increment(-Number(amount)),
      totalSpent: FieldValue.increment(Number(amount)),
    });

    res.status(200).json({ message: "Transaction Successful" });
  } catch (error) {
    const transaction = getTransaction("Failed Transaction ", "failed");
    await transactionRef.add(transaction);
    console.log(error);

    res.status(400).send({ error });
  }

  // axios({
  //   method: "post",
  //   url: "https://www.superjaraapi.com/api/topup/",
  //   headers: {
  //     Authorization: `Token ${process.env.SUPERJARAAPIa}`,
  //     "Content-Type": "application/json",
  //   },
  //   data: data,
  // })
}

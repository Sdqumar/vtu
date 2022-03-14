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
  const data = {
    network,
    amount,
    mobile_number: phoneNumber,
    Ported_number: true,
    airtime_type: "VTU", //VTU or awuf4U or Share and Sell
  };

  const getTransaction = <t extends string>(message: t, status: t) => {
    return {
      uid,
      message,
      status,
      network,
      amount,
      type: "airtime",
      name: "airtime Payment",
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
    if (userData.walletBalance < 10) {
      throw new Error("insufficent funds");
    }
    const transaction = getTransaction("Transaction Successful", "delivered");
    await transactionRef.add(transaction);
    await userRef
      .update({
        walletBalance: FieldValue.increment(-Number(amount)),
        totalFunded: FieldValue.increment(-Number(amount)),
        totalSpent: FieldValue.increment(Number(amount)),
      })
      .then(function () {
        res.status(200).json({ message: "requestSuccessful" });
      })
      .catch(function (error) {
        console.log(error.response.data);
        res.status(400).json(error.response.data);
      });
  } catch (error) {
    console.log(error);
    const transaction = getTransaction("Failed Transactions ", "failed");
    await transactionRef.add(transaction);
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

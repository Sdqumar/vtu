import axios from "axios";
import { FieldValue } from "firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../lib/firebaseNode";
const { v4: uuidv4 } = require("uuid");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { values, user, planCode } = req.body;
  const { network, phoneNumber, amount, pin, bundle } = values;
  const { uid } = user;
  const request_id = uuidv4();

  const getTransaction = <t extends string>(message: t, status: t) => {
    return {
      uid,
      message,
      status,
      network,
      amount,
      request_id,
      type: "Data Payment",
      name: `${network} ${bundle}`,
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
    let networkId = network;
    if (networkId === "MTN SME") {
      networkId = "MTN";
    }
    if (networkId === "MTN GIFTING") {
      networkId = "GIFTING";
    }

    const APITransaction = await axios({
      method: "post",
      url: "https://alagusiy.com/api/data",
      data: {
        token: process.env.ALAGUSIY_API,
        mobile: phoneNumber,
        network: network.toUpperCase(),
        plan_code: planCode,
        request_id,
      },
    });
    console.log(APITransaction);
    console.log(APITransaction.data);

    if (APITransaction.data.code !== "200") {
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
    const transaction = getTransaction("Failed Transaction ", "Failed");
    await transactionRef.add(transaction);
    res.status(400).send({ error });
  }
};
export default handler;

import axios from "axios";
import { FieldValue } from "firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../lib/firebaseNode";
const { v4: uuidv4 } = require("uuid");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { values, user, planCode } = req.body;
  const { network, phoneNumber, amount, bundle } = values;
  const { uid } = user;
  const request_id = uuidv4();

  let networkId = network;
  if (networkId === "MTN SME") {
    networkId = "MTN";
  }
  if (networkId === "MTN GIFTING") {
    networkId = "GIFTING";
  }
  console.log(networkId);

  const getTransaction = <t extends string>(message: t, status: t) => {
    return {
      uid,
      message,
      status,
      network,
      networkId,
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
  const transactionError = firestore.collection("transactionError");

  try {
    let user = await userRef.get();
    let userData = user.data()!;

    if (userData.walletBalance < amount) {
      throw new Error("insufficent funds");
    }
    let APITransaction;
    if (networkId === "AIRTEL") {
      const data = {
        network: 4,
        mobile_number: phoneNumber,
        plan: planCode,
        Ported_number: true,
      };
      console.log(data);

      APITransaction = await axios({
        method: "post",
        url: "https://www.superjaraapi.com/api/data/",
        headers: {
          Authorization: `Token ${process.env.SUPERJARA_API}`,
          "Content-Type": "application/json",
        },
        data,
      });
    } else {
      const data = {
        token: process.env.ALAGUSIY_API,
        mobile: phoneNumber,
        network: networkId,
        plan_code: planCode,
        request_id,
      };
      console.log(data);

      APITransaction = await axios({
        method: "post",
        url: "https://alagusiy.com/api/data",
        data,
      });

      if (APITransaction.data.code !== "200") {
        const transaction = getTransaction("Transaction Failed", "Failed");

        await transactionError.add({
          ...transaction,
          error: APITransaction.data,
          planCode,
        });

        throw new Error("insufficent account funds");
      }
    }

    console.log(APITransaction.data);

    const transaction = getTransaction("Transaction Successful", "Delivered");

    await transactionRef.add(transaction);
    await userRef.update({
      walletBalance: FieldValue.increment(-Number(amount)),
      totalSpent: FieldValue.increment(Number(amount)),
    });
    res.status(200).json({ message: "Transaction Successful" });
  } catch (error: any) {
    console.log(error);
    const transaction = getTransaction("Failed Transaction ", "Failed");
    await transactionRef.add(transaction);
    res.status(400).send({ error });
  }
};
export default handler;

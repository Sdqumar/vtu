import axios from "axios";
import { FieldValue } from "firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../lib/firebaseNode";
const { v4: uuidv4 } = require("uuid");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { values, user, planCode, networkId } = req.body;
  const { network, phoneNumber, amount, bundle } = values;
  const { uid } = user;
  const request_id = uuidv4();

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

    let networkName = network;
    if (networkName === "MTN SME") {
      networkName = "MTN";
    }
    if (networkName === "MTN GIFTING") {
      networkName = "GIFTING";
    }
    console.log(networkName);

    let APITransaction;
    if (networkName === "GIFTING") {
      const data = {
        token: process.env.ALAGUSIY_API,
        mobile: phoneNumber,
        network: networkName,
        plan_code: planCode,
        request_id,
      };
      console.log(data);

      APITransaction = await axios({
        method: "post",
        url: "https://alagusiy.com/api/data",
        data,
      });
    } else {
      const data = {
        network: networkId,
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
    }
    console.log(APITransaction.data);
    console.log(APITransaction.config.url);

    // const transaction = getTransaction("Transaction Successful", "Delivered");

    // await transactionRef.add(transaction);
    // await userRef.update({
    //   walletBalance: FieldValue.increment(-Number(amount)),
    //   totalSpent: FieldValue.increment(Number(amount)),
    // });
    res.status(200).json({ message: "Transaction Successful" });
  } catch (error: any) {
    console.log(error.response.config.url);
    console.log(error.response.status);
    console.log(error.response.data);

    // const transaction = getTransaction("Failed Transaction ", "Failed");
    // await transactionError.add({
    //   ...transaction,
    //   error: {
    //     message: error.response.data.error[0],
    //     status: error.response.status,
    //   },
    // });
    // await transactionRef.add(transaction);
    res.status(400).end();
  }
};
export default handler;

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

  let networkName = network;
  if (networkName === "MTN SME") {
    networkName = "MTN";
  }
  if (networkName === "MTN GIFTING") {
    networkName = "GIFTING";
  }

  const userRef = firestore.collection("users").doc(uid);
  const transactionRef = firestore.collection("transactions");
  const transactionError = firestore.collection("transactionError");

  let userRecord = await userRef.get();
  let userData = userRecord.data()!;

  const getTransaction = (
    message: string,
    status: string,
    newBalance: number
  ) => {
    return {
      uid,
      message,
      status,
      network,
      networkId,
      amount,
      prevBalance: userData.walletBalance,
      newBalance,
      request_id,
      type: "Data Payment",
      description: `${network} ${bundle}`,
      to: phoneNumber,
      date: FieldValue.serverTimestamp(),
    };
  };

  const completeTransaction = async () => {
    const newBalance = Number(userData.walletBalance) - Number(amount);

    const transaction = getTransaction(
      "Transaction Successful",
      "Delivered",
      newBalance
    );

    await transactionRef.add(transaction);
    await userRef.update({
      walletBalance: FieldValue.increment(-Number(amount)),
      totalSpent: FieldValue.increment(Number(amount)),
    });
    res.status(200).json({ message: "Transaction Successful" });
  };

  try {
    if (userData.walletBalance < amount) {
      throw new Error("insufficent funds");
    }

    let APITransaction;

    if (networkName === "MTN" || networkName === "9MOBILE") {
      const data = {
        token: process.env.ALAGUSIY_API,
        mobile: phoneNumber,
        network: networkName,
        plan_code: planCode,
        request_id,
      };

      APITransaction = await axios({
        method: "post",
        url: "https://alagusiy.com/api/data",
        data,
      });

      if (APITransaction.data.code !== "200") {
        const errorResponse = {
          url: APITransaction.config.url,
          dataSent: JSON.parse(APITransaction.config.data),
          erorrMessage: APITransaction.data,
          date: FieldValue.serverTimestamp(),
        };

        await transactionError.add(errorResponse);

        throw new Error("error occured");
      } else {
        completeTransaction();
      }
    } else {
      const data = {
        network: networkId,
        mobile_number: phoneNumber,
        plan: planCode,
        Ported_number: true,
      };

      APITransaction = await axios({
        method: "post",
        url: "https://www.superjaraapi.com/api/data/",
        headers: {
          Authorization: `Token ${process.env.SUPERJARA_API}`,
          "Content-Type": "application/json",
        },
        data,
      });
      completeTransaction();
    }
  } catch (error: any) {
    if (networkName !== "MTN" || networkName !== "9MOBILE") {
      const errorResponse = {
        dataSent: error.response.config.data,
        url: error.response.config.url,
        erorrMessage: error.response.data.error[0],
        date: FieldValue.serverTimestamp(),
        network,
      };
      await transactionError.add(errorResponse);
    }

    const newBalance = userData.walletBalance;
    const transaction = getTransaction(
      "Failed Transaction ",
      "Failed",
      newBalance
    );
    await transactionRef.add(transaction);
    console.log(error);

    res.status(400).send({ error });
  }
};
export default handler;

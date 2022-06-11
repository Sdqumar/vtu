import axios from "axios";
import { FieldValue } from "firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../lib/firebaseNode";
import { v4 as uuidv4 } from "uuid";

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
  const transactionResponse = firestore.collection("transactionResponse");

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

  const chargeUser = async () => {
    await userRef.update({
      walletBalance: FieldValue.increment(-Number(amount)),
      totalSpent: FieldValue.increment(Number(amount)),
    });
  };
  const completeTransaction = async () => {
    const newBalance = Number(userData.walletBalance) - Number(amount);

    const transaction = getTransaction(
      "Transaction Successful",
      "Delivered",
      newBalance
    );

    await transactionRef.add(transaction);

    res.status(200).json({ message: "Transaction Successful" });
  };

  try {
    if (userData.walletBalance < amount) {
      throw new Error("insufficent funds");
    }
    await chargeUser();
    let APITransaction;
    console.log(networkName);

    if (networkName === "9MOBILE") {
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

      console.log(APITransaction.config.data);
      console.log(APITransaction.config.url);
      console.log(APITransaction.data);
      const transacResponse = {
        url: APITransaction.config.url,
        dataSent: JSON.parse(APITransaction.config.data),
        Message: APITransaction.data,
        date: FieldValue.serverTimestamp(),
      };

      await transactionResponse.add(transacResponse);

      if (APITransaction.data.code !== "200") {
        throw new Error("error occured");
      } else {
        await completeTransaction();
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

      console.log(APITransaction.config);
      console.log(APITransaction.data);

      const transacResponse = {
        url: APITransaction.config.url,
        dataSent: JSON.parse(APITransaction.config.data),
        Message: APITransaction.data,
        date: FieldValue.serverTimestamp(),
      };

      await transactionResponse.add(transacResponse);
      await completeTransaction();
    }
  } catch (error: any) {
    if (networkName != "9MOBILE") {
      const errorResponse = {
        dataSent: error.response.config.data,
        status: error.response.status,
        statusText: error.response.statusText,
        url: error.response.config.url,
        date: FieldValue.serverTimestamp(),
        network,
      };
      console.log(errorResponse);

      await transactionResponse.add(errorResponse);
    }

    const newBalance = userData.walletBalance;
    const transaction = getTransaction(
      "Failed Transaction ",
      "Failed",
      newBalance
    );
    await transactionRef.add(transaction);

    res.status(400).send({ error });
  }
};
export default handler;

import axios from "axios";
import { FieldValue } from "firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../lib/firebaseNode";
const { v4: uuidv4 } = require("uuid");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { values, user, networkId } = req.body;
  const { network, phoneNumber, amount } = values;
  const { uid } = user;
  const request_id = uuidv4();

  const userRef = firestore.collection("users").doc(uid);
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
      prevBalance: userData.walletBalance,
      newBalance,
      amount,
      request_id,
      type: " Airtime Payment",
      description: network + " ₦" + amount + " Airtime ",
      to: phoneNumber,
      date: FieldValue.serverTimestamp(),
    };
  };

  const transactionRef = firestore.collection("transactions");

  try {
    let user = await userRef.get();
    let userData = user.data()!;

    if (userData.walletBalance < amount) {
      throw new Error("insufficent funds");
    }
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
    const APITransaction = await axios({
      method: "post",
      url: "https://dontech247.com/api/topup/",
      headers: {
        Authorization: `Token ${process.env.dontech247_API}`,
        "Content-Type": "application/json",
      },
      data: {
        network: networkId.toString(),
        amount,
        mobile_number: phoneNumber,
        Ported_number: true,
        airtime_type: "VTU",
      },
    });
    console.log(APITransaction.data);
    res.status(200).json({ message: "Transaction Successful" });
  } catch (error: any) {
    console.log(error?.response?.data?.error[0]);

    const newBalance = Number(userData.walletBalance);

    const transaction = getTransaction(
      "Failed Transactions ",
      "Failed",
      newBalance
    );
    await transactionRef.add(transaction);

    res.status(400).send({ error: error?.response?.data?.error[0] });
  }
};
export default handler;

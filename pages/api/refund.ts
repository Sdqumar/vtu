import { FieldValue } from "firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../lib/firebaseNode";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid, transactionId } = req.body;
  console.log(uid, transactionId);

  const userRef = firestore.collection("users").doc(uid);
  const transactionRef = firestore
    .collection("transactions")
    .doc(transactionId);
  const transaction = await transactionRef.get();
  const amount = await transaction.data()!.amount;
  console.log(amount);

  await userRef.update({
    walletBalance: FieldValue.increment(Number(amount)),
    totalSpent: FieldValue.increment(-Number(amount)),
  });

  await transactionRef.update({
    status: "Refunded",
    prevBalance: FieldValue.increment(Number(amount)),
    newBalance: FieldValue.increment(Number(amount)),
  });
  res.status(200).json({ message: "Transaction Successful" });
};
export default handler;

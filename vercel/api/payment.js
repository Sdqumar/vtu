import { firestore } from "../firebaseNode.js";
import { auth } from "../firebaseNode";
import admin from "firebase-admin";

const handler = async (req, res) => {
  try {
    const body = req.body;

    const user = await auth.getUserByEmail(body.data.customer.email);
    const amount = body.data.amount / 100;
    const data = {
      name: "wallet fund",
      date: admin.firestore.FieldValue.serverTimestamp(),
      uid: user.uid.toString(),
      amount: amount,
      charges: amount * 0.02,
      total: Math.floor(amount - amount * 0.02),
      type: "wallet fund",
      message: body.event,
      status: body.data.status,
    };
    await firestore.collection("transactions").add(data);

    if (body.event === "charge.success") {
      await firestore.doc(`users/${data.uid}`).update({
        walletBalance: admin.firestore.FieldValue.increment(data.total),
        totalFunded: admin.firestore.FieldValue.increment(data.total),
      });
    }
    res.send(200);
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};

export default handler;

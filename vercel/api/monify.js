import { firestore } from "../firebaseNode.js";
import { auth } from "../firebaseNode";
import admin from "firebase-admin";

const handler = async (req, res) => {
  try {
    const body = req.body.eventData;
    const user = await auth.getUserByEmail(body?.customer?.email);
    const amount = Number(body.amountPaid);
    const data = {
      name: "wallet fund",
      date: admin.firestore.FieldValue.serverTimestamp(),
      uid: user.uid.toString(),
      paidOn: body.paidOn,
      amount: amount,
      charges: amount -  Number(body.settlementAmount),
      total:  Number(body.settlementAmount),
      type: "wallet fund",
      transaction:body.transactionReference,
      status: body.paymentStatus,
    };
    
    await firestore.collection("transactions").add(data);

    if (req.body.eventType === "SUCCESSFUL_TRANSACTION") {
      await firestore.doc(`users/${data?.uid}`).update({
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



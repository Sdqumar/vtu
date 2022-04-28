const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

module.exports.payStackWebhook = functions.https.onRequest(async (req, res) => {
  try {
    console.log(JSON.stringify(req.body));

    const body = req.body;
    await admin.firestore().collection("payment").add(body);
    const user = await admin.auth().getUserByEmail(body.data.customer.email);

    const data = {
      name: "wallet fund",
      date: admin.firestore.FieldValue.serverTimestamp(),
      uid: user.uid.toString(),
      amount: parseInt(body.data.amount / 100),
      type: "wallet fund",
      message: body.event,
      status: body.data.status,
    };
    await admin.firestore().collection("transactions").add(data);

    if (body.event === "charge.success") {
      const data = body.data.metadata;
      admin
        .firestore()
        .doc(`users/${data.uid}`)
        .update({
          walletBalance: admin.firestore.FieldValue.increment(data.amount),
          totalFunded: admin.firestore.FieldValue.increment(data.amount),
        });
    }
    res.send(200);
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});

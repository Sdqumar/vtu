const functions = require("firebase-functions");
const admin = require("firebase-admin");
const crypto = require("crypto");

admin.initializeApp();

exports.paymentWebhook = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const body = req.body;
  const eventType = body.eventType;

  const eventData = body.eventData;
  const metaData = eventData.metaData;
  const userId = metaData.uid;

  try {
    const data = {
      name: "wallet fund",
      date: admin.firestore.FieldValue.serverTimestamp(),
      to: metaData.number,
      amount: metaData.amount,
      type: "wallet fund",
      uid: metaData.uid,
      message: eventType,
      status: eventType,
    };
    await admin.firestore().collection("transactions").add(data);

    if (eventType === "SUCCESSFUL_TRANSACTION") {
      admin
        .firestore()
        .collection("users")
        .doc(userId)
        .update({
          walletBalance: admin.firestore.FieldValue.increment(
            Number(metaData.amount)
          ),
          totalFunded: admin.firestore.FieldValue.increment(
            Number(metaData.amount)
          ),
        });
    }
    res.end();
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

exports.payStackWebhook = functions.https.onRequest(async (req, res) => {
  try {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    console.log(JSON.stringify(req.body));
    const hash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");
    console.log(JSON.stringify(hash == req.headers["x-paystack-signature"]));
    // if (hash == req.headers["x-paystack-signature"]) {

    const body = req.body;
    await admin.firestore().collection("payment").add(body);
    const user = await admin.auth().getUserByEmail(body.data.customer.email);

    const data = {
      name: "wallet fund",
      date: admin.firestore.FieldValue.serverTimestamp(),
      uid: user.uid.toString(),
      amount: body.data.amount / 100,
      type: "wallet fund",
      message: body.event,
      status: body.data.status,
    };

    await admin.firestore().collection("transactions").add(data);

    if (body.event === "charge.success") {
      const data = body.data.metadata;

      admin
        .firestore()
        .collection("users")
        .doc(data.uid)
        .update({
          walletBalance: admin.firestore.FieldValue.increment(
            Number(data.amount)
          ),
          totalFunded: admin.firestore.FieldValue.increment(
            Number(data.amount)
          ),
        });
    }
    // }
    res.send(200);
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});

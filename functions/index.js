const functions = require("firebase-functions");
const admin = require("firebase-admin");
const crypto = require("crypto");

admin.initializeApp();

exports.paymentWebhook = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const body = req.body;
  const eventType = body.eventType;
  try {
    await admin.firestore().collection("payment").add(body);

    if (eventType === "SUCCESSFUL_TRANSACTION") {
      const eventData = body.eventData.metaData;
      const userId = eventData.uid;

      admin
        .firestore()
        .collection("users")
        .doc(userId)
        .update({
          walletBalance: admin.firestore.FieldValue.increment(
            Number(eventData.amount)
          ),
          totalFunded: admin.firestore.FieldValue.increment(
            Number(eventData.amount)
          ),
        });
    }
    res.end();
  } catch (error) {
    res.status(400).json(error);
  }
});

exports.payStackWebhook = functions.https.onRequest(async (req, res) => {
  try {
    const secret = "sk_test_480638cae57f4e6754e0fa512ed2de5c34a5f1a6";
    const hash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");
    if (hash == req.headers["x-paystack-signature"]) {
      const body = req.body;
      await admin.firestore().collection("payment").add(body);

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
    }
    res.send(200);
  } catch (error) {
    res.send("error");
  }
});

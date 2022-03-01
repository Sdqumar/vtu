const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.paymentWebhook = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const body = {
    eventType: "SUCCESSFUL_TRANSACTION",
    eventData: {
      metaData: {
        uid: "s05eCpxUAWd7ApmmtsvgTEfWnTb2",
        amount: "323",
      },
    },
  };
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
          wallentBalance: admin.firestore.FieldValue.increment(
            Number(eventData.amount)
          ),
        });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

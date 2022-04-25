import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../lib/firebaseNode";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  auth
    .getUserByEmail("sdqumar09@gmail.com")
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log(userRecord);

      console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
    })
    .catch((error) => {
      console.log("Error fetching user data:", error);
    });
  res.status(200);
  // await axios({
  //   method: "POST",
  //   data: {
  //     data: {
  //       customer: { email: "sdqumar09@gmail.com" },
  //       channel: "dedicated_nuban",
  //     },
  //   },
  //   url: "http://localhost:5001/vtu-app-93616/us-central1/payStackWebhook",
  // })
  //   .then(function (response) {
  //     console.log(response.data);
  //     console.log(response);

  //   })
  // .catch(function (error) {
  //   console.log(error);
  //   // res.status(400).json(error.response.data);
  // });
}

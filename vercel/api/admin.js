import { auth } from "../firebaseNode";

const handler = async (req, res) => {
  const email = req.query.email;
  const accesskey = req.query.accesskey;

  console.log(email, accesskey);
  try {
    const user = await auth.getUserByEmail(email);
    if (process.env.ACCESSKEY === accesskey) {
      await auth.setCustomUserClaims(user.uid, {
        admin: true,
      });
      console.log(user);
      res.status(200).json(`user as been been given admin access`);
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
};

export default handler;

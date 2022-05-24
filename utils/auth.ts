import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import firebase from "../lib/firebaseConfig";
const auth = getAuth(firebase);
import { setCookies } from "cookies-next";

export type form = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: number;
};

export const signUp = async (values: form) => {
  const { email, password, firstName, lastName, phoneNumber } = values;
  const db = getFirestore(firebase);
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  await updateProfile(user, {
    displayName: firstName,
  });
  let customer = {
    email,
    firstName,
    lastName,
    phoneNumber,
  };
  const customerData = await fetch("/api/createAccount", {
    method: "POST",
    body: JSON.stringify(customer),
  });
  let { accountNumber } = await customerData.json();

  await sendEmailVerification(user);
  await setDoc(doc(db, "users", user.uid), {
    name: `${firstName} ${lastName}`,
    email,
    firstName,
    lastName,
    phoneNumber,
    walletBalance: 0,
    accountNumber,
  });

  setCookies("uid", user.uid);
  return user;
};

export const signIn = async (values: form) => {
  const { email, password } = values;
  const user = await signInWithEmailAndPassword(auth, email, password);

  setCookies("uid", user.user.uid);
  return user;
};

export const signout = () => signOut(auth);

export const checkAdmin = async () => {
  const isAdmin = await auth.currentUser?.getIdTokenResult();

  return isAdmin!.claims.admin;
};

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

export type form = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: number;
  pin: number;
};

export const signUp = async (values: form) => {
  const { email, password, firstName, lastName, phoneNumber, pin } = values;
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
    accountNumber,
    pin,
  });
};

export const signIn = (values: form) => {
  const { email, password } = values;
  return signInWithEmailAndPassword(auth, email, password);
};

export const signout = () => signOut(auth);

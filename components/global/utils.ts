import { doc, getDoc, getFirestore } from "firebase/firestore";
import { UseFormSetError } from "react-hook-form";
import firebase from "../../lib/firebaseConfig";
const db = getFirestore(firebase);

export const getUserData = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};
type phoneNumber = {
  network?: string;
  phoneNumber?: number;
};

export const validatePhoneNumber = (
  setError: UseFormSetError<phoneNumber>,
  values: phoneNumber
) => {
  const numberPrefix = values.phoneNumber?.toString().slice(0, 4);
  const MTNPrefixes = [
    "0806",
    "0803",
    "0704",
    "0706",
    "0906",
    "0702",
    "0814",
    "0810",
    "0813",
    "0816",
    "0903",
    "0703",
    "0913",
  ];
  const AirtelPrefixes = [
    "0901",
    "0808",
    "0907",
    "0812",
    "0708",
    "0701",
    "0902",
    "0802",
  ];
  const GloPrefixes = ["0905", "0805", "0705", "0815", "0807", "0811"];
  const EtisaltPrefixes = ["0909", "0818", "0908", "0809", "0817"];

  let isValidNumber;

  if (values.network === "Airtel") {
    isValidNumber = AirtelPrefixes.includes(numberPrefix!);
  }

  if (values.network === "GLO") {
    isValidNumber = GloPrefixes.includes(numberPrefix!);
  }

  if (values.network === "9mobile") {
    isValidNumber = EtisaltPrefixes.includes(numberPrefix!);
  }

  if (values.network === "MTN") {
    isValidNumber = MTNPrefixes.includes(numberPrefix!);
  }
  if (values.phoneNumber?.toString().length !== 11) {
    setError("phoneNumber", {
      type: "number",
      message: "Incorrect phone number!",
    });
    return false;
  }

  if (!isValidNumber) {
    setError("phoneNumber", {
      type: "number",
      message: `Incorrect ${values.network} phone number!`,
    });
    return false;
  }
  return isValidNumber;
};

type BalanceAndPIN = {
  pin?: number;
  amount?: number;
};
type user = {
  pin?: number | undefined;
  walletBalance?: number | undefined;
};
export const validateBalanceAndPIN = (
  setError: UseFormSetError<BalanceAndPIN>,
  values: BalanceAndPIN,
  user: user
) => {
  if (values.pin !== user.pin) {
    setError("pin", {
      type: "wrongpin",
      message: "Incorrect Pin!",
    });
    return false;
  }

  if (values.amount! < 0) {
    setError("amount", {
      type: "amount",
      message: "Incorrect amount value!",
    });
    return false;
  }
  if (values.amount! > user.walletBalance!) {
    setError("amount", {
      type: "amount",
      message: "Insufficent Funds!",
    });
    return false;
  }
  return true;
};

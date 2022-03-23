import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import firebase from "../lib/firebaseConfig";

export const getTransactions = async (uid: string) => {
  const db = getFirestore(firebase);
  const q = query(collection(db, "transactions"), where("uid", "==", uid));
  const data: DocumentData[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

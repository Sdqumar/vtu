import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebase from "../../lib/firebaseConfig";
const db = getFirestore(firebase);

export const getUserData = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

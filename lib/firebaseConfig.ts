import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBqGoOqzGJnoOyBqy_6lAf5e-fQJjwN5HQ",
  authDomain: "vtu-app-93616.firebaseapp.com",
  projectId: "vtu-app-93616",
  storageBucket: "vtu-app-93616.appspot.com",
  messagingSenderId: "879643097891",
  appId: "1:879643097891:web:5d28b8e27f25978a082a96",
  measurementId: "G-YDXWSHT1P4"
};

const firebase = initializeApp(firebaseConfig);

export const analytics = () => {
  if (typeof window !== "undefined") {
    return getAnalytics(firebase);
  } else {
    return null
  }
}
export default firebase
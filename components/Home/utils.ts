import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import firebase from "../../lib/firebaseConfig";

export const prices = [
  {
    img: "/mtn.png",
    network: "MTN",
    prices: [
      {
        size: "500.0MB",
        price: "₦150",
        duration: "30 days",
      },
      {
        size: "1.0GB",
        price: "₦250",
        duration: "30 days",
      },
      {
        size: "2.0GB",
        price: "₦450",
        duration: "30 days",
      },
      {
        size: "3.0GB",
        price: "₦650",
        duration: "30 days",
      },
      {
        size: "5.0GB",
        price: "₦1050",
        duration: "30 days",
      },
      {
        size: "10.0GB",
        price: "₦2050",
        duration: "30 days",
      },
      {
        size: "20.0GB",
        price: "₦4400",
        duration: "30 days",
      },
    ],
  },
  {
    img: "/airtel.png",
    network: "Airtel",
    prices: [
      {
        size: "1000.0MB",
        price: "₦150",
        duration: "30 days",
      },
      {
        size: "1.0GB",
        price: "₦250",
        duration: "30 days",
      },
      {
        size: "2.0GB",
        price: "₦450",
        duration: "30 days",
      },
      {
        size: "3.0GB",
        price: "₦650",
        duration: "30 days",
      },
      {
        size: "5.0GB",
        price: "₦1050",
        duration: "30 days",
      },
      {
        size: "10.0GB",
        price: "₦2050",
        duration: "30 days",
      },
      {
        size: "20.0GB",
        price: "₦4400",
        duration: "30 days",
      },
    ],
  },
  {
    img: "/9mobile.png",
    network: "9mobile",
    prices: [
      {
        size: "500.0MB",
        price: "₦150",
        duration: "30 days",
      },
      {
        size: "1.0GB",
        price: "₦250",
        duration: "30 days",
      },
      {
        size: "2.0GB",
        price: "₦450",
        duration: "30 days",
      },
      {
        size: "3.0GB",
        price: "₦650",
        duration: "30 days",
      },
      {
        size: "5.0GB",
        price: "₦1050",
        duration: "30 days",
      },
      {
        size: "10.0GB",
        price: "₦2050",
        duration: "30 days",
      },
      {
        size: "20.0GB",
        price: "₦4400",
        duration: "30 days",
      },
    ],
  },
  {
    img: "/glo.png",
    network: "GLO",
    prices: [
      {
        size: "500.0MB",
        price: "₦150",
        duration: "30 days",
      },
      {
        size: "1.0GB",
        price: "₦250",
        duration: "30 days",
      },
      {
        size: "2.0GB",
        price: "₦450",
        duration: "30 days",
      },
      {
        size: "3.0GB",
        price: "₦650",
        duration: "30 days",
      },
      {
        size: "5.0GB",
        price: "₦1050",
        duration: "30 days",
      },
      {
        size: "10.0GB",
        price: "₦2050",
        duration: "30 days",
      },
      {
        size: "20.0GB",
        price: "₦4400",
        duration: "30 days",
      },
    ],
  },
];
export type form = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: number;
};

export const signUp = (values: form) => {
  const { email, password, firstName, lastName, phoneNumber } = values;
  const db = getFirestore(firebase);
  const auth = getAuth(firebase);
  return createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: firstName,
      }).then(async () => {
        await setDoc(doc(db, "users", user.uid), {
          name: `${firstName} ${lastName}`,
          email,
          firstName,
          lastName,
          phoneNumber,
        });
      });
    }
  );
};
export const signIn = (values: form) => {
  const { email, password } = values;
  const auth = getAuth(firebase);
  return signInWithEmailAndPassword(auth, email, password);
  // .then((userCredential) => {
  //   const user = userCredential.user;
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  // });
};

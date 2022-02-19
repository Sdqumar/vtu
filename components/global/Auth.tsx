import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthUser, useUser } from "../context/userContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "../../lib/firebaseConfig";
import { getUserData } from "./utils";
type Authprops = {
  children: ReactNode;
};

function Auth({ children }: Authprops) {
  const userContext = useUser();
  const user = userContext?.user;
  const setUser = userContext!.setUser;

  const [loading, setloading] = useState(true);
  const [verify, setverify] = useState(false);
  const router = useRouter();

  const getUser = async () => {
    const auth = getAuth(firebase);
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const { email, displayName, uid } = currentUser;
        const userData = await getUserData(uid);
        if (!user?.displayName) {
          //@ts-ignore
          setUser({ email, displayName, uid, ...userData });
        }
        setverify(true);
        setloading(false);
      } else {
        setloading(false);
      }
    });
  };

  useEffect(() => {
    getUser();
  }, [user]);
  if (!verify && !loading && router.pathname !== "/") {
    router.push("/");
  }
  return (user && verify) || router.pathname === "/" ? (
    <>{children}</>
  ) : (
    <h1>loading....</h1>
  );
}

export default Auth;

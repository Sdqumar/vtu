import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthUser, useUser } from "../context/userContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "../../lib/firebaseConfig";
type Authprops = {
  children: ReactNode;
};

function Auth({ children }: Authprops) {
  const userContext = useUser();
  const user = userContext?.user;
  const setUser = userContext!.setUser;

  const [loading, setloading] = useState(true);
  const [currentUser, setCurrentUser] = useState<AuthUser>();
  const [verify, setverify] = useState(false);
  const router = useRouter();

  const getUser = async () => {
    const auth = getAuth(firebase);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { email, displayName, uid } = user;
        setCurrentUser({ email, displayName, uid });
        setverify(true);
        setloading(false);
      } else {
        setloading(false);
      }
    });
  };
  console.log(router.pathname === "/");

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

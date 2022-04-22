import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../context/userContext";
import { getAuth } from "firebase/auth";
import firebase from "../../lib/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserData } from "./utils";
import Spinner from "./sipnner";
type Authprops = {
  children: ReactNode;
};

function Auth({ children }: Authprops) {
  const userContext = useUser();
  const setUser = userContext!.setUser;

  const [verify, setverify] = useState(false);
  const router = useRouter();
  const auth = getAuth(firebase);
  const [user, loading, error] = useAuthState(auth);

  const getUser = async () => {
    if (user) {
      const { email, displayName, uid } = user;
      const userData = await getUserData(uid);
      if (typeof email === "string") {
        setUser({ email, displayName, uid, ...userData });
      }
      setverify(true);
    } else {
      setverify(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [user]);
  const spinner = () => (
    <div className=" mt-60 flex items-center justify-center align-middle">
      <Spinner color="green" size={10} />
    </div>
  );

  if (!user && !verify && !loading && router.pathname !== "/") {
    router.push("/");
  }
  return (user && verify) || router.pathname === "/" ? (
    <>{children}</>
  ) : (
    <>{spinner()}</>
  );
}

export default Auth;

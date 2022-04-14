import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../context/userContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "../../lib/firebaseConfig";
import { getUserData } from "./utils";
import Spinner from "./sipnner";
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
          typeof email === "string" &&
            setUser({ email, displayName, uid, ...userData });
        }
        setverify(true);
        setloading(false);
      } else {
        setverify(false);
        setloading(false);
      }
    });
  };

  useEffect(() => {
    getUser();
  }, [user]);

  const spinner = () => (
    <div className=" mt-60 flex items-center justify-center align-middle">
      <Spinner color="green" size={10} />
    </div>
  );
  if (verify && !loading && router.pathname == "/") {
    router.push("/dashboard");
  }
  //logout user
  if (!verify && !loading && router.pathname !== "/") {
    router.push("/");
  }

  if (!user && !verify && !loading && router.pathname == "/") {
    return <>{children}</>;
  }
  return user && verify && !loading && router.pathname !== "/" ? (
    <>{children}</>
  ) : (
    <h1>{spinner()}</h1>
  );
}

export default Auth;

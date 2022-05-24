import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../context/userContext";
import { getUserData } from "./utils";
import Spinner from "./sipnner";
import { checkAdmin } from "../../utils/auth";
import { getCookie } from "cookies-next";
type Authprops = {
  children: ReactNode;
};

function Auth({ children }: Authprops) {
  const userContext = useUser();
  const setUser = userContext!.setUser;

  const [verify, setverify] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const uid = getCookie("uid");

  const getUser = async () => {
    if (uid) {
      const userData = await getUserData(uid as "uid");
      const isAdmin = (await checkAdmin()) as string;
      // @ts-ignore
      setUser({ uid, isAdmin: isAdmin, ...userData });
      setverify(true);
      setLoading(false);
    } else {
      setverify(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [uid]);
  const spinner = () => (
    <div className=" mt-60 flex items-center justify-center align-middle">
      <Spinner color="green" size={10} />
    </div>
  );

  if (!uid && !verify && !loading && router.pathname !== "/") {
    router.push("/");
  }
  return (uid && verify) || router.pathname === "/" ? (
    <>{children}</>
  ) : (
    <>{spinner()}</>
  );
}

export default Auth;

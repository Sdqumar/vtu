import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../context/userContext";
import Spinner from "./sipnner";
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
  let user = getCookie("user") as any;
  const getUser = async () => {
    if (user) {
      user = JSON.parse(user);
      setLoading(false);

      // @ts-ignore
      setUser({ ...user });
      setverify(true);
    } else {
      setverify(false);
      setLoading(false);
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

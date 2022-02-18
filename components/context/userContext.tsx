import React, { createContext, useState, useContext, ReactNode } from "react";

type props = {
  children: ReactNode;
};
type AuthUser = {
  email: string | null;
  uid: string;
  displayName: string | null;
};
type userContext = {
  user: AuthUser | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null | undefined>>;
};
const UserContext = createContext<userContext | null>(null);

function UserProvider({ children }: props) {
  const [user, setUser] = useState<AuthUser | null>();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

export default UserProvider;

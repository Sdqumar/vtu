import React, { createContext, useState, useContext, ReactNode } from "react";

type props = {
  children: ReactNode;
};
export type AuthUser = {
  email: string;
  uid: string;
  displayName: string | null;
  name?: string;
  pin?: number;
  phoneNumber?: number;
  walletBalance?: number;
  totalFunding?: number;
  totalSpent?: number;
};
const AuthUser = {
  email: "",
  uid: "",
  displayName: "",
};
type userContext = {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
};
const UserContext = createContext<userContext | null>(null);

function UserProvider({ children }: props) {
  const [user, setUser] = useState<AuthUser | null>(AuthUser);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

export default UserProvider;

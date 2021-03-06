import React, { createContext, useState, useContext, ReactNode } from "react";

type props = {
  children: ReactNode;
};
export type AuthUser = {
  email: string;
  uid: string;
  displayName: string | null;
  name?: string;
  refers?: string;
  firstName?: string;
  phoneNumber?: number;
  walletBalance?: number;
  totalFunded?: number;
  totalSpent?: number;
  isAdmin?: string;
  accountNumber?: number;
  earnings?: number;
  DataNetworks?: string[];
};

type userContext = {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
};
const UserContext = createContext<userContext | null>(null);

function UserProvider({ children }: props) {
  const [user, setUser] = useState<AuthUser | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

export default UserProvider;

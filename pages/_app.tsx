import "../styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "../components/global/sidebar";
import UserProvider from "../components/context/userContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex">
      <UserProvider>
        <Sidebar />
        <Component {...pageProps} />
      </UserProvider>
    </div>
  );
}

export default MyApp;

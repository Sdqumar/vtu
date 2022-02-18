import "../styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "../components/global/sidebar";
import UserProvider from "../components/context/userContext";
import Auth from "../components/global/Auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex">
      <UserProvider>
        <Auth>
          <Sidebar />
          <Component {...pageProps} />
        </Auth>
      </UserProvider>
    </div>
  );
}

export default MyApp;

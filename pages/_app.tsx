import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserProvider from "../components/context/userContext";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";
import SessionTimeout from "../components/global/SessionTimeout";

const Auth = dynamic(() => import("../components/global/Auth"));
const Whatsapp = dynamic(() => import("../components/global/Whatapp"));
const Sidebar = dynamic(() => import("../components/global/sidebar"));
import CssBaseline from "@mui/material/CssBaseline";
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHomepage = router.pathname === "/";

  return (
    <UserProvider>
      <Auth>
        <CssBaseline />
        <div className="flex">
          <Sidebar />
          <Whatsapp />
          {!isHomepage && (
            <div className=" fixed z-10 h-12 w-full bg-white bg-opacity-60 backdrop-blur-lg backdrop-filter"></div>
          )}
          <Head>
            <link rel="icon" href="/favicon.png" />
            <title>Quadrorecharge</title>
          </Head>
          <SessionTimeout />
          <Component {...pageProps} />
        </div>
      </Auth>
    </UserProvider>
  );
}

export default MyApp;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "../components/global/sidebar";
import UserProvider from "../components/context/userContext";
import Auth from "../components/global/Auth";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import Whatsapp from "../components/global/Whatapp";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <UserProvider>
          <Auth>
            <div className="flex">
              <Sidebar />
              <Whatsapp />

              <Component {...pageProps} />
            </div>
          </Auth>
        </UserProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "../components/global/sidebar";
import UserProvider from "../components/context/userContext";
import Auth from "../components/global/Auth";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
// @ts-ignore
const WhatsAppWidget = dynamic(() => import("react-whatsapp-chat-widget"), {
  ssr: false,
});
import "react-whatsapp-chat-widget/index.css";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <UserProvider>
          <Auth>
            <div className="flex">
              <Sidebar />
              {router.pathname !== "/" && (
                // @ts-ignore
                <WhatsAppWidget phoneNo="07013038554" />
              )}
              <Component {...pageProps} />
            </div>
          </Auth>
        </UserProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;

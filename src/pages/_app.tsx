import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { GeneralContextProvider } from "../stores/general";
import { SocketContextProvider } from "../stores/socket";
import { DenseAppBar } from "../components/Navbar/components/Dense-app-bar";
import { MobileAppBar } from "../components/Navbar/components/Mobile-app-bar";
import { Footer } from "../components/General/components/Footer";
import { AlertMessage } from "../components/General/components/Alert-message";
import { CookieConsentModal } from "../components/CookieConsentModal/CookieConsentModal";

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();

  return (
    <GeneralContextProvider>
      <SocketContextProvider>
        <div className="h-full flex flex-col justify-between">
          <DenseAppBar />
          <MobileAppBar />
          <Component {...pageProps} />
          {!(asPath.includes("/basket") || asPath.includes("/admin")) && <Footer />}
          <CookieConsentModal />
          <AlertMessage />
        </div>
      </SocketContextProvider>
    </GeneralContextProvider>
  );
}

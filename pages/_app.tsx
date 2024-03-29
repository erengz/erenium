import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { AppProps } from "next/app";
import {
  ConnectWallet,
  ThirdwebProvider,
  bloctoWallet,
  coinbaseWallet,
  embeddedWallet,
  en,
  frameWallet,
  localWallet,
  metamaskWallet,
  phantomWallet,
  rainbowWallet,
  safeWallet,
  smartWallet,
  trustWallet,
  walletConnect,
  zerionWallet,
} from "@thirdweb-dev/react";
import "../styles/globals.css";
import Navbar from "../components/navbar";
import Header from "../components/header";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
    clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
    activeChain={activeChain}
    locale={en()}
    supportedWallets={[
      metamaskWallet(),
      coinbaseWallet(),
      walletConnect(),
      safeWallet({
        personalWallets: [
          metamaskWallet(),
          coinbaseWallet(),
          walletConnect(),
          localWallet(),
          embeddedWallet({
            auth: {
              options: [
                "email",
                "google",
                "apple",
                "facebook",
              ],
            },
          }),
          trustWallet(),
          zerionWallet(),
          bloctoWallet(),
          frameWallet(),
          rainbowWallet(),
          phantomWallet(),
        ],
      }),
      localWallet(),
      embeddedWallet({
        auth: {
          options: [
            "email",
            "google",
            "apple",
            "facebook",
          ],
        },
      }),
      trustWallet(),
      zerionWallet(),
      bloctoWallet(),
      frameWallet(),
      rainbowWallet(),
      phantomWallet(),
    ]}
  >
      <Analytics />
      <SpeedInsights/>
      <Header />
      <Component {...pageProps} />
      <Navbar />
    </ThirdwebProvider>
    
  );
}

export default MyApp;

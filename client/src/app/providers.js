"use client";

import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import { chains, config } from "../wagmi/chains";
import { Provider } from 'react-redux'
import { store } from '/src/utils/store'
import { PrivyProvider } from '@privy-io/react-auth';
import {
  attachmentContentTypeConfig,
  reactionContentTypeConfig,
  XMTPProvider,
} from "@xmtp/react-sdk";



export function Providers({ children }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <Provider store={store}>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
        onSuccess={(user) => console.log(`User ${user.id} logged in!`)}
        config={{
          supportedChains: chains,
          embeddedWallets: {
            createOnLogin: 'users-without-wallets'
          }
        }}
      >
        <WagmiConfig config={config}>
          <RainbowKitProvider chains={chains} theme={darkTheme()}>
            <XMTPProvider> {mounted && children} </XMTPProvider>{" "}
          </RainbowKitProvider>
        </WagmiConfig>
      </PrivyProvider>
    </Provider>
  );
}
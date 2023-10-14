"use client";

import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import { chains, config } from "../wagmi/chains";
import {
  attachmentContentTypeConfig,
  reactionContentTypeConfig,
  XMTPProvider,
} from "@xmtp/react-sdk";



export function Providers({ children }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <XMTPProvider> {mounted && children} </XMTPProvider>{" "}
      </RainbowKitProvider>{" "}
    </WagmiConfig>
  );
}

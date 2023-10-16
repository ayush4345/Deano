import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import * as chain from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";


export const mumbaiFork = {
  id: 5151111,
  name: "Fork Mumbai - Tutorial Sismo",
  network: "forkMumbaiTutoSismo",
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545"],
    },
    public: {
      http: ["http://127.0.0.1:8545"],
    },
  },
};


// All of the chains configured below are supported by Tableland
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mumbaiFork,
    chain.mainnet,
    chain.goerli,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
    chain.arbitrumGoerli,
    chain.sepolia,
    chain.polygonMumbai,
    chain.optimismGoerli,
    chain.filecoinCalibration,
    chain.hardhat,
  ],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ?? "" }), // Set up an Alchemy account: https://www.alchemy.com/
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Tableland Starter",
  chains,
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? "", // Set up a WalletConnect account: https://walletconnect.com/
});

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export { chains };

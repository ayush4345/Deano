'use client';
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useContractWrite,
  useDisconnect,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
} from "wagmi";
import {
  mainnet,
  sepolia,
  arbitrumGoerli,
  scrollTestnet,
  scrollSepolia,
  polygonMumbai,
  base,
  baseGoerli,
} from "wagmi/chains";
import { waitForTransaction } from "@wagmi/core";
import { decodeEventLog, formatEther } from "viem";
import { abi as PayoutABI } from "../../abi/Payout.json";
import { errorsABI, formatError, fundMyAccountOnLocalFork, signMessage } from "@/utils/misc";
import {
  SismoConnectButton, // the Sismo Connect React button displayed below
  AuthType, // the authType enum, we will choose 'VAULT' in this tutorial
} from "@sismo-core/sismo-connect-react";
// import { transactions } from "../../broadcast/Payout.s.sol/5151111";
import { transactions } from "../../broadcast/Payout.s.sol/80001/run-latest.json";
import { useRouter } from "next/navigation";

/* ***********************  Sismo Connect Config *************************** */

const sismoConnectConfig = {
  appId: "0xf4977993e52606cfd67b7a1cde717069",
};

/* ********************  Defines the chain to use *************************** */
const CHAIN = polygonMumbai;

export default function Home() {

  const DEANO_ANNOTATORS_GROUP_ID = "0x390f865ab67200e84079573e5de40d56";

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [amountClaimed, setAmountClaimed] = useState("");
  const [responseBytes, setResponseBytes] = useState("");

  /* ***************  Wagmi hooks for wallet connection ******************** */
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const { isConnected, address } = useAccount();
  const { switchNetworkAsync, switchNetwork } = useSwitchNetwork();

  /* *************  Wagmi hooks for contract interaction ******************* */
  const contractCallInputs =
    responseBytes && chain
      ? {
        address: transactions[0].contractAddress,
        abi: [...PayoutABI, ...errorsABI],
        functionName: "claimWithSismo",
        args: [responseBytes],
        chain,
      }
      : {};

  const { config, error: wagmiSimulateError } = usePrepareContractWrite(contractCallInputs);
  const { writeAsync } = useContractWrite(config);

  /* *************  Handle simulateContract call & chain errors ************ */
  useEffect(() => {
    if (chain?.id !== CHAIN.id) return setError(`Please switch to ${CHAIN.name} network`);
    setError("");
  }, [chain]);

  useEffect(() => {
    if (!wagmiSimulateError) return;
    if (!isConnected) return;
    return setError(formatError(wagmiSimulateError));
  }, [wagmiSimulateError, isConnected]);

  /* ************  Handle the payout claim button click ******************* */
  async function claimPayout() {
    if (!address) return;
    setError("");
    setLoading(true);
    try {
      // Switch to the selected network if not already on it
      if (chain?.id !== CHAIN.id) await switchNetworkAsync?.(CHAIN.id);
      const tx = await writeAsync?.();
      const txReceipt = tx && (await waitForTransaction({ hash: tx.hash }));
      if (txReceipt?.status === "success") {
        const mintEvent = decodeEventLog({
          abi: PayoutABI,
          data: txReceipt.logs[0]?.data,
          topics: txReceipt.logs[0]?.topics,
        });
        const args = mintEvent?.args
        const ethAmount = formatEther(BigInt(args.value));
        setAmountClaimed(ethAmount);
      }
    } catch (e) {
      setError(formatError(e));
    } finally {
      setLoading(false);
      router.replace('/redeem');

    }
  }


  return (
    <>
      <main className={styles.main}>
        <h1 className="text-xl font-bold">
          Payout
        </h1>

        <p>
          Your salary will be determined 
        </p>

        {!isConnected && (
          <>
            {connectors.map((connector) => (
              <button
                disabled={!connector.ready || isLoading}
                key={connector.id}
                onClick={() => connect({ connector })}
              >
                {isLoading && pendingConnector?.id === connector.id
                  ? "Connecting..."
                  : "Connect wallet"}
              </button>
            ))}
          </>
        )}

        {isConnected && !responseBytes && (
          <div className="">



            <SismoConnectButton
              // the client config created
              config={sismoConnectConfig}
              claims={[

                {
                  groupId: DEANO_ANNOTATORS_GROUP_ID,
                  isSelectableByUser: true,
                  isOptional: false,
                }
              ]}
              // the auth request we want to make
              // here we want the proof of a Sismo Vault ownership from our users
              auths={[{ authType: AuthType.EVM_ACCOUNT }]}
              // we ask the user to sign a message
              // it will be used onchain to prevent frontrunning
              signature={{ message: signMessage(address) }}
              // onResponseBytes calls a 'setResponse' function with the responseBytes returned by the Sismo Vault
              onResponseBytes={(responseBytes) => {
                setResponseBytes(responseBytes);
              }}
              // Some text to display on the button
              text={"Claim with Sismo"}
            />
          </div>
        )}

        {isConnected && responseBytes && !amountClaimed && (
          <>
            <p>Chain: {chain?.name}</p>
            <p>Your payout destination address is: {address}</p>
            <button disabled={loading || Boolean(error)} onClick={() => claimPayout()}>
              {!loading ? "Claim" : "Claiming..."}
            </button>
          </>
        )}

        {isConnected && responseBytes && amountClaimed && (
          <>
            <p>Congratulations!</p>
            <p>
              You have claimed {amountClaimed} tokens on {address}.
            </p>
          </>
        )}
        {isConnected && !amountClaimed && error && (
          <>
            <p className={styles.error}>{error}</p>
            {error.slice(0, 16) === "Please switch to" && (
              <button onClick={() => switchNetwork?.(CHAIN.id)}>Switch chain</button>
            )}
          </>
        )}
      </main>

    </>
  );
}




"use client";


import Redeem from "./redeem";
import { usePrivy, useWallets } from "@privy-io/react-auth";

export default function RedeemPage() {

  const { ready, authenticated, user, login, logout, signMessage } = usePrivy();
  const { wallets } = useWallets();

  return (
    <>
      {ready && wallets.length > 0
        ? <Redeem />
        : <div className="h-[75vh] w-screen flex flex-col items-center justify-center backdrop-blur-sm">
          <div className=" font-semibold text-lg text-red-950 mb-4">You need to login to access page!!</div>
          <button className=" bg-orange-600 text-white p-3 px-3 rounded-xl font-semibold" onClick={login}>Login Privy</button>
        </div>
      }
    </>
  );
}
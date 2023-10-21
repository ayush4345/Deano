"use client";
import Link from "next/link";
import { Suspense, useState, useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import Token from "@/components/Token";
import VendorJobs from "../../components/VendorJobs";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import XMTPChat from "@/components/XMTP/XMTPChat";

export default function VendorPage() {
  const [vendorDetails, setVendorDetails] = useState({ name: "Loading..." });

  useEffect(() => {
    const getVendorDetails = async () => {
      const res = await fetch(
        "http://localhost:3000/api/vendor/0x3151D7f15e6cdfEeeA36D0dE4F6Da118f7A757e7/"
      );
      const data = await res.json();
      console.log(data);
      setVendorDetails(data);
    };
    getVendorDetails();
  }, []);

  const { address } = useAccount();
  const { ready, authenticated, user, login, logout, signMessage } = usePrivy();
  const { wallets } = useWallets(); 

  return (
    <>
      {ready && wallets.length > 0
        ? <main className="flex p-24 flex-col bg-white">
          <div className="profile flex flex-row justify-between">
            <Suspense fallback={<div> Loading... </div>}>
              {" "}
              <Card className="flex-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-md font-medium">
                    {" "}
                    {vendorDetails.name}{" "}
                  </CardTitle>{" "}
                </CardHeader>{" "}
              </Card>{" "}
              {ready && wallets.length > 0 && <Token />}{" "}
            </Suspense>{" "}
          </div>
          <div className=" flex gap-5 ">
            {ready && wallets.length > 0 && (
              <VendorJobs vendor_address={wallets[0].address} />
            )}
            <XMTPChat
              peer="Annotator"
              peerAddress={`0x994E0408180C98d81597bD271fF9f3FB0c9a6Dfe`}
            />
          </div>
        </main>
        : <div className="h-[75vh] w-screen flex flex-col items-center justify-center backdrop-blur-sm">
          <div className=" font-semibold text-lg text-red-950 mb-4">You need to login to access page!!</div>
          <button className=" bg-orange-600 text-white p-3 px-3 rounded-xl font-semibold" onClick={login}>Login Privy</button>
        </div>
      }
    </>
  );
}

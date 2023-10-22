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
import { db } from "../../tableland/connect";
import { useSelector } from "react-redux";

export default function VendorPage() {
  const [vendorDetails, setVendorDetails] = useState({ name: "Loading..." });
  const [contactInfo, setContactInfo] = useState([])
  const AnnotatorAddress = useSelector((state) => state.vendor.xmtpAnnotator)

  useEffect(() => {
    const getVendorDetails = async () => {
      const res = await fetch(
        `https://deano.vercel.app/api/vendor/${wallets[0].address}`
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

  useEffect(() => {

    async function fetchContactInfo() {
      console.log("fetching info...")
      const tableName = `jobs_final2_80001_7898`;
      const response = await db.prepare(`SELECT job_id FROM ${tableName} where vendor_address='${wallets[0]?.address}';`).all();
      console.log(response.results);

      let temp = []

      response.results.map(async (info) => {
        const { results } = await db.prepare(`SELECT * FROM answers_final_80001_7894 where job_id ='${info.job_id}';`).all();
        const response = results.filter((item) => item.labels.length > 0)
        console.log(response)
        temp = temp.concat(response);
        setContactInfo(temp)
      })
    }

    if (wallets.length > 0) {
      fetchContactInfo()
    }
  }, [ready, wallets])

  console.log(contactInfo)

  return (
    <>
      {ready && wallets.length > 0
        ? <main className="flex p-20 flex-col bg-white">
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
              peerAddress={AnnotatorAddress}
              contactList={contactInfo}
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

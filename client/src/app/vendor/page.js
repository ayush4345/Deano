'use client'
import Link from "next/link"
import { Suspense, useState, useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '../../components/ui/card'

import Token from "@/components/Token"
import VendorJobs from "../../components/VendorJobs";

export default function VendorPage() {

    const [vendorDetails, setVendorDetails] = useState({ name: "Loading..." })

    useEffect(() => {
        const getVendorDetails = async () => {
            const res = await fetch("http://localhost:3000/api/vendor/0x3151D7f15e6cdfEeeA36D0dE4F6Da118f7A757e7/")
            const data = await res.json()
            console.log(data)
            setVendorDetails(data)
        }
        getVendorDetails()
    }, [])

    const { address } = useAccount();
    const res = useBalance({
        address: address,
        token: "0x158012940D35D9F14C091A6f21DC4F0B2Ce126F7",
    })

    return (
        <main className="flex p-24 flex-col bg-white">

            <div className="profile flex flex-row justify-between">
                <Suspense fallback={<div>Loading...</div>}>
                    <Card className="flex-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-md font-medium">
                                {vendorDetails.name}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Token />
                </Suspense>
            </div>           

            <VendorJobs vendor_address={address} />      

        </main>
    )
}




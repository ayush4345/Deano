"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function VendorPage() {

    const router = useRouter()

    return (
        <main className="h-full flex-1 flex-col space-y-8 p-8 flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Welcome Vendor!</h2>
                    <p className="text-muted-foreground">
                        Here&apos;s a list of your jobs made by you!
                    </p>
                </div>
                <div className="flex items-end flex-col space-x-2">
                    <h3 className="text-xl font-semibold">
                        Tokens available: 0
                    </h3>
                    <Button onClick={() => router.push("/faucet")}>
                        Get tokens
                    </Button>
                </div>
            </div>
            <Button variant="outline" onClick={() => router.push("/vendor/create")} >
                Create New Job
            </Button>
        </main>
    )
}


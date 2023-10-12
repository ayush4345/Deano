import Link from "next/link"
export default function VendorPage() {
    return (
        <main className="flex p-24 flex-col bg-white">
            <h1 className="text-3xl">Vendor Page</h1>
            <div className="flex flex-row justify-between">

                <Link href="/vendor/create">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Create New Job
                    </button>
                </Link>

                <h3 className="text-xl">
                    Tokens available: 0
                    <Link href={"/faucet"}>
                        <button>
                            Get tokens
                        </button>
                    </Link>
                </h3>
            </div>
            <h2 className="text-2xl">Jobs</h2>

        </main>
    )
}


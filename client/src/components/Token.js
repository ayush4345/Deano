import { useAccount, useBalance} from "wagmi";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Button } from "./ui/button";


export default function Token() {
    const { address } = useAccount();
    const res = useBalance({
        address: address,
        token: "0x6cD23FB64f122705AbeE7305Eef346Bb10175491",
    })

    if (res.isLoading) return <div>Loading...</div>
    if (res.error) return <div>Error: {res.error.message}</div>
    return (
        <div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {res.data.symbol} Balance
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{
                        //concat to 2 decimal places
                        res.data.formatted.slice(0, -16)
                    } {res.data.symbol}</div>

                    <Button className="m-2">
                        <a href="https://app.uniswap.org/#/swap?inputCurrency=0x158012940D35D9F14C091A6f21DC4F0B2Ce126F7&outputCurrency=MATIC" target="_blank" rel="noopener noreferrer">
                            Get Tokens
                        </a>
                    </Button>

                </CardContent>
            </Card>
        </div>
    )
}
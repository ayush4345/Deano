import { useAccount, useBalance} from "wagmi";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Button } from "./ui/button";
import { useWallets } from "@privy-io/react-auth";

export default function Token() {
    const { address } = useAccount();
    const { wallets } = useWallets();

    const res = useBalance({
        address: wallets[0].address,
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
                        res.data.formatted
                    } {res.data.symbol}</div>

                    <Button className="m-2">
                        <a href="https://app.uniswap.org/#/swap?inputCurrency=MATIC&outputCurrency=0x6cD23FB64f122705AbeE7305Eef346Bb10175491" target="_blank" rel="noopener noreferrer">
                            Get Tokens
                        </a>
                    </Button>

                </CardContent>
            </Card>
        </div>
    )
}